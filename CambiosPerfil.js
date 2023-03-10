import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SearchBar, Input, Image, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'react-native-image-picker';

export default class CambiosPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        nombre:'',
        correo:'',
        correoNuevo:'',
        password:'',
        nuevoPassword:'',
        rutai:'',
        fechaNacimiento:'',
        datos:[],
    };
  }

  uploadImageToServer = async () => {
    const response = await fetch(this.state.fileUri);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {
      var InsertApi = 'https://sitio1pro.online/upload.php';
      console.log(reader.result);
      var Data = {img: reader.result};
      var headers = {'Accept':'application/json','Content-Type':'application.json'}
      fetch (InsertApi,{method:'POST',headers:headers,body:JSON.stringify(Data)}).then((response)=>
      response.json().then((response)=>{console.log("server " + response);
        this.setState({rutai:"https://sitio1pro.online/imagenes/" + response})}).catch(err=>{
        console.log(err);
      }))
    }
    reader.readAsDataURL(blob);
  }

  render() {
    const buscarUsuario = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/buscarUsuario.php?correo=" + this.state.correo + "&password=" + this.state.password);
      xhttp.send();
    }

    function ejecutarFunciones(){
      mostrarConfirmacionAlerta();
      modificaUsuario();
      regresar();
    }

    function mostrarConfirmacionAlerta(){
      console.log("Confirmado");
    }
    
    const modificarUsuario = () => {
      Alert.alert("¿Está seguro de modificar sus datos?", "¿De verdad quiere cambiar sus datos del perfil?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }

    const regresar = () => {
      this.props.navigation.navigate('Detalles Perfil');
    }

    const modificaUsuario = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Usuario actualizado", "Sus datos fueron actualizados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al actualizar el usuario", "Hubo un error al actualizar los datos del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/modificarUsuario.php?nombre=" + this.state.nombre + "&correo=" + this.state.correo +
        "&correoNuevo= " + this.state.correoNuevo + "&password=" + this.state.password + "&nuevoPassword=" + this.state.nuevoPassword + 
        "&imagen=" + this.state.rutai + "&fechaNacimiento=" + this.state.fechaNacimiento, true);
      xhttp.send();
    }
    const accesoFotos = () => {
      ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 400,
        maxWidth: 400,
      },
      (response) => {
        console.log(response);
        this.setState({resourcePath: response});
        var source = response;
        var array = Object.keys(source).map(function(key){
          return source[key];
        });
        var finalArray = array[0][0];
        this.setState({fileUri: finalArray.uri});
        this.uploadImageToServer();
        console.log(finalArray.uri);
      },
    )
  }
    return (
      <View style={{backgroundColor:'lightblue'}}>
      <SafeAreaView>
        <ScrollView>
        <View style={{width:100, marginLeft:10, marginTop:5, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Detalles Perfil')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Cambiar datos de Usuario </Text>
        <View style={styles.correo}>
        <SearchBar placeholder="Buscar correo" onChangeText={(correo)=> this.setState({correo})} value={this.state.correo}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='email-search' size={24} />} style={{color:'black'}}/>
        </View>
        <View style={styles.password}>
        <SearchBar placeholder="Buscar contraseña" onChangeText={(password)=> this.setState({password})} value={this.state.password}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='shield-search' size={24} />} style={{color:'black'}} secureTextEntry={true}/>
        </View>
        <FlatList onAccessibilityAction={buscarUsuario()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={styles.nombre}>
          <Input label='Nombre' placeholder='Nombre' value={item.Nombre} onChangeText={(nombre)=> this.setState({nombre})} leftIcon={ <Icon name='user' size={24} color='tomato'/>}/>
          <Input label='Correo electrónico' placeholder='Correo electrónico' value={item.Correo} onChangeText={(correoNuevo)=> this.setState({correoNuevo})} leftIcon={ <Entypo name='email' size={22} color='black'/>
            }/>
          <Input label='Contraseña' placeholder='Contraseña' value={item.Password} onChangeText={(nuevoPassword)=> this.setState({nuevoPassword})} leftIcon={
            <Icon name='lock' size={24} color='gold'/>}
            secureTextEntry={true}/>
          <View>
             <Text style={{fontSize:20,marginLeft:10,color:'black'}}>Imagen de Perfil</Text>
             <TouchableOpacity onPress={accesoFotos}><Image source={this.state.fileUri ? {uri: this.state.fileUri} : {uri: item.Imagen}} style={styles.imagen}/></TouchableOpacity>
          </View>
          <View style={styles.fechaNacimiento}>
          <Text style={{fontSize:20, color:'black', marginTop:10}}>Fecha de Nacimiento</Text>
          <DatePicker style={{width: 200, marginTop:10}} date={item.FechaNacimiento} mode="date"
        placeholder="Elige una fecha" format="YYYY-MM-DD" minDate="1900-01-01" maxDate="2008-12-31"
        confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
          dateInput: { marginLeft: 36 }
        }} onDateChange={(fechaNacimiento) => {this.setState({fechaNacimiento})}}/>
          </View>
          <View style={{width:140, marginLeft:80, marginTop:10, backgroundColor:'burlywood'}}>
            <Button type="clear" onPress={modificarUsuario} icon={ <Icon name="pencil" size={15} style={{marginRight:5}} color="blue"/>} title="Cambiar datos"/>
          </View>
          </View>
        )}keyExtractor={item => item.Correo}></FlatList>
      </ScrollView>
      </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:36,
        textAlign:'center',
        marginTop:5,
        color:'black',
    },
    nombre:{
        width:300,
        marginTop:10,
        marginLeft:20,
    },
    correo:{
        width:320,
        marginLeft:20,
        marginTop:5,
    },
    password:{
        width:280,
        marginLeft:20,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:10,
      marginTop:5,
    },
    fechaNacimiento:{
      width:220,
    },
})