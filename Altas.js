import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Image, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';

export default class Altas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        nombre:'',
        codigo:'',
        password:'',
        centro:'',
        rutai:'',
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
    const altaDatos = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Usuario registrado","Datos registrados correctamente",[{
                text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
              },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }else{
            Alert.alert("Error al registrar el usuario","Error al registrar los datos del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/auth.php?nombre=" + this.state.nombre +
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
      <SafeAreaView>
      <ScrollView>
      <View style={{backgroundColor:'lightgreen'}}>
        <Text style={styles.titulo}> Altas </Text>
        <View style={styles.nombre}>
        <Input label='Nombre' placeholder='Nombre' onChangeText={(nombre)=> this.setState({nombre})} leftIcon={
          <Icon name='user' size={24} color='tomato'/>}/>
        </View>
        <View style={styles.codigo}>
        <Input label='Código' placeholder='Código' onChangeText={(codigo)=> this.setState({codigo})} leftIcon={
          <Icon name='keyboard-o' size={24} color='black'/>
          }
          keyboardType='phone-pad'/>
        </View>
        <View style={styles.password}>
        <Input label='Contraseña' placeholder='Contraseña' onChangeText={(password)=> this.setState({password})} leftIcon={
          <Icon name='lock' size={24} color='gray'/>}
          secureTextEntry={true}/>
        </View>
        <View>
          <Text style={{fontSize:20,marginLeft:30,marginTop:5}}>Centro Universitario</Text>
          <Picker selectedValue={this.state.centro} onValueChange={(centro)=> this.setState({centro})}
            style={{ height: 50, width: 210, marginLeft:20 }}>
              <Picker.Item label="CUAAD" value="CUAAD" />
              <Picker.Item label="CUCBA" value="CUCBA" />
              <Picker.Item label="CUCEA" value="CUCEA" />
              <Picker.Item label="CUCEI" value="CUCEI" />
              <Picker.Item label="CUCS" value="CUCS" />
              <Picker.Item label="CUCSH" value="CUCSH" />
              <Picker.Item label="CUTLAJOMULCO" value="CUTLAJOMULCO" />
              <Picker.Item label="CUTONALA" value="CUTONALA" />
          </Picker>
        </View>
        <View>
           <Text style={{fontSize:20,marginLeft:30,marginTop:10}}>Imagen Avatar</Text>
           <TouchableOpacity onPress={accesoFotos}>{this.renderFileUri()}</TouchableOpacity>
        </View>
        <View style={{marginTop:10, width:100, marginLeft:120}}>
          <Button onPress={altaDatos} icon={ <Icon name="user-plus" size={15} color="white"/>} title="Altas"/>
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:40,
        textAlign:'center',
    },
    nombre:{
        width:260,
        marginTop:20,
        marginLeft:20,
    },
    codigo:{
        width:220,
        marginTop:10,
        marginLeft:20,
    },
    password:{
        width:260,
        marginTop:10,
        marginLeft:20,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:30,
      marginTop:10,
    },
})