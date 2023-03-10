import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input, Image, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'react-native-image-picker';

export default class AltaProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        nombre:'',
        tipo:'',
        marca:'',
        precio:'',
        descripcion:'',
        rutai:'',
        fechaPublicacion:'',
        nombreUsuario:'',
    };
  }

  renderFileUri(){
    if(this.state.fileUri){
      return <Image source={{uri: this.state.fileUri}} style={styles.imagen}/>
    }else{
      return <Image source={require('./imagenes/Ic_now_wallpaper_48px.png')} style={styles.imagen}/> 
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
    const altaProducto = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Producto guardado", "Los datos del producto fueron guardados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al registrar el producto", "Hubo un error al guardar los datos del producto",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "http://sitio1pro.online/altaProducto.php?nombre=" + this.state.nombre + "&tipo=" + this.state.tipo + "&marca=" + this.state.marca +
      "&precio=" + this.state.precio + "&descripcion=" + this.state.descripcion + "&imagen=" + this.state.rutai + "&fechaPublicacion=" + this.state.fechaPublicacion + "&nombreUsuario=" + this.state.nombreUsuario, true);
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
        <Text style={styles.titulo}> Publica Producto </Text>
        <View style={styles.nombre}>
        <Input label='Nombre de producto' placeholder='Nombre' onChangeText={(nombre)=> this.setState({nombre})} leftIcon={ <Fontisto name='shopping-sale' size={24} color='tomato'/>}/>
        </View>
        <View style={styles.tipo}>
        <Input label='Tipo' placeholder='Tipo' onChangeText={(tipo)=> this.setState({tipo})} leftIcon={ <Ionicons name='pricetag' size={22} color='black'/>
          }/>
        </View>
        <View style={styles.tipo}>
        <Input label='Marca' placeholder='Marca' onChangeText={(marca)=> this.setState({marca})} leftIcon={ <MaterialIcons name='branding-watermark' size={22} color='black'/>
          }/>
        </View>
        <View style={styles.precio}>
        <Input label='Precio' placeholder='Precio' onChangeText={(precio)=> this.setState({precio})} leftIcon={
          <FontAwesome5 name='dollar-sign' size={24} color='green'/>}
          secureTextEntry={true} keyboardType='phone-pad'/>
        </View>
        <View style={styles.descripcion}>
          <Input label='Descripción' placeholder='Descripción' onChangeText={(descripcion)=> this.setState({descripcion})} leftIcon={ <Entypo name='text' size={24} color='blue'/>}/>
        </View>
        <View>
           <Text style={{fontSize:20,marginLeft:30,color:'black'}}>Imagen de Producto</Text>
           <TouchableOpacity onPress={accesoFotos}>{this.renderFileUri()}</TouchableOpacity>
        </View>
        <View style={styles.fechaPublicacion}>
        <Text style={{fontSize:20, color:'black'}}>Fecha de Publicación</Text>
        <DatePicker style={{width: 200, marginTop:10}} date={this.state.fechaPublicacion} mode="date"
        placeholder="Elige una fecha" format="YYYY-MM-DD" minDate="2020-01-01" maxDate="2200-12-31"
        confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 }
        }} onDateChange={(fechaPublicacion) => {this.setState({fechaPublicacion})}}/>
        </View>
        <View style={styles.nombreUsuario}>
          <Input label='Nombre de usuario' placeholder='Nombre de usuario' onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} leftIcon={ <Icon name='user' size={24} color='tomato'/>}/>
        </View>
        <View style={{width:100, marginLeft:120, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={altaProducto} icon={ <MaterialIcons name="shopping-bag" size={18} color="blue"/>} title="Publicar"/>
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
        width:260,
        marginTop:10,
        marginLeft:20,
    },
    tipo:{
        width:240,
        marginLeft:20,
    },
    precio:{
        width:200,
        marginLeft:20,
    },
    descripcion:{
        width:320,
        marginLeft:20,
    },
    fechaPublicacion:{
        width:220,
        marginLeft:20,
        marginTop:10,
    },
    nombreUsuario:{
        width:260,
        marginLeft:20,
        marginTop:10,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:30,
      marginTop:5,
    },
})