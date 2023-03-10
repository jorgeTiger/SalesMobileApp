import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, Image, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'react-native-image-picker';

export default class AltaUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        nombre:'',
        correo:'',
        password:'',
        rutai:'',
        fechaNacimiento:'',
        saldo:0,
    };
  }

  renderFileUri(){
    if(this.state.fileUri){
      return <Image source={{uri: this.state.fileUri}} style={styles.imagen}/>
    }else{
      return <Image source={require('./imagenes/User_Avatar.png')} style={styles.imagen}/> 
    }
  }

  uploadImageToServer = async () => {
    const response = await fetch(this.state.fileUri);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = () => {
      var InsertApi = 'http://sitio1pro.online/upload.php';
      console.log(reader.result);
      var Data = {img: reader.result};
      var headers = {'Accept':'application/json','Content-Type':'application.json'}
      fetch (InsertApi,{method:'POST',headers:headers,body:JSON.stringify(Data)}).then((response)=>
      response.json().then((response)=>{console.log("server " + response);
        this.setState({rutai:"http://sitio1pro.online/imagenes/" + response})}).catch(err=>{
        console.log(err);
      }))
    }
    reader.readAsDataURL(blob);
  }

  render() {
    const altaUsuario = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Usuario guardado", "Sus datos fueron guardados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al registrar el usuario", "Hubo un error al guardar los datos del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "http://sitio1pro.online/altaUsuario.php?nombre=" + this.state.nombre +
        "&correo=" + this.state.correo + "&password=" + this.state.password + "&imagen=" + this.state.rutai +
        "&fechaNacimiento=" + this.state.fechaNacimiento, true);
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
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Inicio de Sesión')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Alta de Usuario </Text>
        <View style={styles.nombre}>
        <Input label='Nombre' placeholder='Nombre' onChangeText={(nombre)=> this.setState({nombre})} leftIcon={ <Icon name='user' size={24} color='tomato'/>}/>
        </View>
        <View style={styles.correo}>
        <Input label='Correo electrónico' placeholder='Correo electrónico' onChangeText={(correo)=> this.setState({correo})} leftIcon={ <Entypo name='email' size={22} color='black'/>
          }/>
        </View>
        <View style={styles.password}>
        <Input label='Contraseña' placeholder='Contraseña' onChangeText={(password)=> this.setState({password})} leftIcon={
          <Icon name='lock' size={24} color='gold'/>}
          secureTextEntry={true}/>
        </View>
        <View>
           <Text style={{fontSize:20,marginLeft:30,color:'black'}}>Imagen de Perfil</Text>
           <TouchableOpacity onPress={accesoFotos}>{this.renderFileUri()}</TouchableOpacity>
        </View>
        <View style={styles.fechaNacimiento}>
        <Text style={{fontSize:20, color:'black'}}>Fecha de Nacimiento</Text>
        <DatePicker style={{width: 200, marginTop:10}} date={this.state.fechaNacimiento} mode="date"
        placeholder="Elige una fecha" format="YYYY-MM-DD" minDate="1900-01-01" maxDate="2008-12-31"
        confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 }
        }} onDateChange={(fechaNacimiento) => {this.setState({fechaNacimiento})}}/>
        </View>
        <View style={{width:100, marginLeft:120, marginTop:15, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={altaUsuario} icon={ <Icon name="user-plus" style={{marginRight:3}} size={15} color="blue"/>} title="Guardar"/>
        </View>
      </ScrollView>
      </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:40,
        textAlign:'center',
        marginTop:10,
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
    },
    password:{
        width:260,
        marginLeft:20,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:30,
      marginTop:5,
    },
    fechaNacimiento:{
      width:220,
      marginLeft:20,
      marginTop:10,
    },
})