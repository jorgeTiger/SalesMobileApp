import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Image, Button, SearchBar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'react-native-image-picker';

export default class CambiarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileUri:'',
        nombre:'',
        nuevoNombre:'',
        tipo:'',
        marca:'',
        precio:'',
        descripcion:'',
        rutai:'',
        fechaPublicacion:'',
        nombreUsuario:'',
        nuevoNombreUsuario:'',
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
    const buscarProducto = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/buscarProductos.php?nombre=" + this.state.nombre + "&nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
    }
    
    function ejecutarFunciones(){
      mostrarConfirmacionAlerta();
      modificaProducto();
      regresar();
    }

    function mostrarConfirmacionAlerta(){
      console.log("Confirmado");
    }

    const modificarProducto = () => {
      Alert.alert("¿Está seguro de modificar el producto?", "¿De verdad quiere cambiar los datos del producto?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }

    const regresar = () => {
      this.props.navigation.navigate('Mostrar Productos');
    }

    const modificaProducto = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Producto actualizado", "Los datos del producto fueron actualizados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al actualizar el producto", "Hubo un error al actualizar los datos del producto",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/modificarProducto.php?nombre=" + this.state.nombre + "&nuevoNombre=" + this.state.nuevoNombre  + "&tipo=" + this.state.tipo + "&marca=" + this.state.marca +
      "&precio=" + this.state.precio + "&descripcion=" + this.state.descripcion + "&imagen=" + this.state.rutai + "&fechaPublicacion=" + this.state.fechaPublicacion + "&nombreUsuario=" + this.state.nombreUsuario +
      "&nuevoNombreUsuario=" + this.state.nuevoNombreUsuario, true);
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
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'lightgreen'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Mostrar Productos')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Cambiar datos de Producto </Text>
        <View style={styles.nombre}>
        <SearchBar placeholder="Buscar producto" onChangeText={(nombre)=> this.setState({nombre})} value={this.state.nombre}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='shopping-search' size={24} />} style={{color:'black'}}/>
        </View>
        <View style={styles.nombreUsuario}>
        <SearchBar placeholder="Buscar usuario" onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} value={this.state.nombreUsuario}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='account-search' size={24} />} style={{color:'black'}}/>
        </View>
        <FlatList onAccessibilityAction={buscarProducto()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={styles.nombre}>
          <Input label='Nombre de Producto' placeholder='Nombre de Producto' value={item.Nombre} onChangeText={(nombre)=> this.setState({nombre})} leftIcon={ <Fontisto name='shopping-sale' size={24} color='tomato'/>}/>
          <Input label='Tipo' placeholder='Tipo' value={item.Tipo} onChangeText={(tipo)=> this.setState({tipo})} leftIcon={ <Ionicons name='pricetag' size={22} color='black'/>
            }/>
          <Input label='Marca' placeholder='Marca' value={item.Marca} onChangeText={(marca)=> this.setState({marca})} leftIcon={ <MaterialIcons name='branding-watermark' size={22} color='black'/>
            }/>
          <Input label='Precio' placeholder='Precio' value={item.Precio} onChangeText={(precio)=> this.setState({precio})} leftIcon={
            <FontAwesome5 name='dollar-sign' size={24} color='green'/>}
            secureTextEntry={true} keyboardType='phone-pad'/>
            <Input label='Descripción' placeholder='Descripción' value={item.Descripcion} onChangeText={(descripcion)=> this.setState({descripcion})} leftIcon={ <Entypo name='text' size={24} color='blue'/>}/>
            <Text style={{fontSize:20,marginLeft:10,color:'black'}}>Imagen de Producto</Text>
            <TouchableOpacity onPress={accesoFotos}><Image source={this.state.fileUri ? {uri: this.state.fileUri} : {uri: item.Imagen}} style={styles.imagen}/></TouchableOpacity>
            <Text style={{fontSize:20, color:'black', marginTop:10}}>Fecha de Publicación</Text>
            <DatePicker style={{width: 200, marginTop:10}} date={item.FechaPublicacion} mode="date"
             placeholder="Elige una fecha" format="YYYY-MM-DD" minDate="2020-01-01" maxDate="2200-12-31"
             confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{ 
              dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 }}}
              onDateChange={(fechaPublicacion) => {this.setState({fechaPublicacion})}}/>
            <View style={{marginTop:5}}>
             <Input label='Nombre de usuario' placeholder='Nombre de usuario' value={item.NombreUsuario} onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} leftIcon={ <Icon name='user' size={24} color='tomato'/>}/>
             </View>
            <View style={{width:180, marginLeft:70, marginTop:5, backgroundColor:'lightgreen'}}>
            <Button type="clear" onPress={modificarProducto} icon={ <MaterialIcons name="shopping-bag" size={18} color="blue"/>} title="Actualizar producto"/>
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
        fontSize:34,
        textAlign:'center',
        marginTop:10,
        color:'black',
    },
    nombre:{
        width:320,
        marginTop:10,
        marginLeft:20,
    },
    tipo:{
        width:240,
        marginLeft:20,
    },
    precio:{
        width:260,
        marginLeft:20,
    },
    descripcion:{
        width:320,
        marginLeft:20,
    },
    fechaPublicacion:{
        width:220,
        marginLeft:20,
    },
    nombreUsuario:{
        width:320,
        marginLeft:20,
    },
    imagen:{
      width:120,
      height:120,
      marginLeft:10,
      marginTop:5,
    },
})