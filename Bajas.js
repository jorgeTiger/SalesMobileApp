import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button, SearchBar } from 'react-native-elements';

export default class Bajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo: '',
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
    xhttp.open("GET", "http://sitio1pro.online/buscarCodigo.php?codigo=" + this.state.codigo);
    xhttp.send();
  }

  render() {
    const ejecutarFunciones = () => {
      mostrarAlerta();
      eliminarDatos();
    }
  
    const mostrarAlerta = () => {
      console.log("Confirmado");
    }
    const eliminaDatos = () => {
      Alert.alert("¿Desea eliminar el usuario?","¿Realmente desea eliminar el usuario?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      },{ text: "Si", onPress: ejecutarFunciones }]);
    }

    const eliminarDatos = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Usuario eliminado","Datos eliminados correctamente",[{
                text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
              },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }else{
            Alert.alert("Error al eliminar el usuario","Error al eliminar los datos del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            },{ text: "OK", onPress: () => console.log("OK Presionado") }]);
          }
        }
      };
      xhttp.open("GET", "http://sitio1pro.online/eliminar.php?codigo=" + this.state.codigo);
      xhttp.send();
    }

    return (
      <View>
        <Text style={styles.titulo}> Bajas </Text>
        <View style={styles.codigo}>
        <SearchBar placeholder="Código" onChangeText={(codigo)=> this.setState({codigo})}
          value={this.state.codigo} searchIcon={<Icon name='text-search' size={24} color='black'/>}
          lightTheme={true} style={{color:'black'}} keyboardType='phone-pad'/>
        </View>
        <View>
        <FlatList onAccessibilityAction={this.componentDidMount()} style={{marginTop:15}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:10, width:255, marginLeft:50, marginTop:10}}>Nombre: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:10, width:255, marginLeft:50}}>Código: {item.Codigo}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15 , color:'white', padding:10, width:255, marginLeft:50}}>Centro: {item.Centro}</Text>
            <View style={{marginTop:15, width:100, marginLeft:120}}>
            <Button onPress={eliminaDatos} icon={ <AntDesign name="delete" size={15} color="white" style={{marginRight:5}}/>} title="Eliminar"/>
            </View>
          </View>
          )}keyExtractor={item => item.Codigo}></FlatList>
        </View>
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
    imagen:{
      width: 120,
      height: 140,
      marginLeft:120,
      marginTop:5,
    },
})
