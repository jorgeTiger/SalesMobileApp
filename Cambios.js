import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Image, Button, SearchBar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

export default class Cambios extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        codigo:'',
        nombre:'',
        centro:'',
        password:'',
        rutai:'',
        datos: [],
    };
  }

  componentDidMount = () => {
    let _this = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({datos: temp});
      }
    };
    xhttp.open("GET", "https://sitio1pro.online/buscarCodigo.php?codigo=" + this.state.codigo);
    xhttp.send();
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
    const modificaDatos = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Usuario actualizado","Datos actualizados correctamente",[{
                text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
              },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }else{
            Alert.alert("Error al actualizar el usuario","Error al actualizar los datos del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/modificar.php?nombre=" + this.state.nombre +
        "&codigo=" + this.state.codigo + "&password=" + this.state.password + "&centro=" + this.state.centro +
        "&imagen=" + this.state.rutai, true);
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
      <View>
        <Text style={styles.titulo}> Cambios </Text>
        <View style={styles.codigo}>
        <SearchBar placeholder="Código" onChangeText={(codigo)=> this.setState({codigo})}
          value={this.state.codigo} searchIcon={<MaterialCommunityIcons name='text-search' size={24} color='black'/>}
          lightTheme={true} style={{color:'black'}} keyboardType='phone-pad'/>
        </View>
        <FlatList onAccessibilityAction={this.componentDidMount()} style={{marginTop:5}} data={this.state.datos} renderItem={({item}) => (
          <View style={styles.nombre}>
          <Input label='Nombre' placeholder='Nombre' value={item.Nombre} onChangeText={(nombre)=> this.setState({nombre})} leftIcon={
            <Icon name='user' size={24} color='tomato'/>}/>
          <View style={styles.password}>
          <Input label='Contraseña' placeholder='Contraseña' value={item.Password} onChangeText={(password)=> this.setState({password})} leftIcon={
            <Icon name='lock' size={24} color='gray'/>} secureTextEntry={true}/>
          </View>
            <Text style={{fontSize:20,marginLeft:5,marginTop:5}}>Centro Universitario</Text>
            <Picker selectedValue={item.Centro} onValueChange={(centro)=> this.setState({centro})}
              style={{ height: 50, width: 210 }}>
                <Picker.Item label="CUAAD" value="CUAAD" />
                <Picker.Item label="CUCBA" value="CUCBA" />
                <Picker.Item label="CUCEA" value="CUCEA" />
                <Picker.Item label="CUCEI" value="CUCEI" />
                <Picker.Item label="CUCS" value="CUCS" />
                <Picker.Item label="CUCSH" value="CUCSH" />
                <Picker.Item label="CUTLAJOMULCO" value="CUTLAJOMULCO" />
                <Picker.Item label="CUTONALA" value="CUTONALA" />
            </Picker>
            <Text style={{fontSize:20,marginLeft:5,marginTop:10}}>Imagen Avatar</Text>
            <TouchableOpacity onPress={accesoFotos}><Image source={this.state.fileUri ? {uri: this.state.fileUri} : {uri: item.Imagen}} style={styles.imagen}/></TouchableOpacity>
          <View style={{marginTop:10, width:110, marginLeft:100}}>
            <Button onPress={modificaDatos} icon={ <Icon name="pencil" size={15} color="white" style={{marginRight:5}}/>} title="Cambios"/>
          </View>
          </View>
          )}keyExtractor={item => item.Codigo}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:40,
        textAlign:'center',
    },
    codigo:{
      width:220,
      marginTop:20,
      marginLeft:20,
    },
    nombre:{
      width:280,
      marginTop:10,
      marginLeft:20,
    },
    password:{
      width:280,
      marginTop:10,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:5,
      marginTop:10,
    },
})
