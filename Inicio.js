import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:'',
      datos:[],
    };
  }

  render() {
    const devolverDatos = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({datos: temp});
      }
    };
    xhttp.open("GET", "https://sitio1pro.online/buscarProducto.php?nombre=" + this.state.nombre);
    xhttp.send();
    }

    return (
      <View>
        <SafeAreaView>
        <ScrollView style={{backgroundColor:'khaki'}}>
        <Text style={styles.titulo}> Ventas <Fontisto name='shopping-store' size={30} /> </Text>
        <View style={styles.nombre}>
          <SearchBar placeholder="Buscar producto" onChangeText={(nombre)=> this.setState({nombre})} value={this.state.nombre}
        lightTheme={true} searchIcon={<Icon name='shopping-search' size={24} />} style={{color:'black'}}/>
        </View>
        <FlatList onAccessibilityAction={devolverDatos()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Producto: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Tipo: {item.Tipo}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Marca: {item.Marca}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Precio: ${item.Precio}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Descripción: {item.Descripcion}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Fecha de publicación: {item.FechaPublicacion}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Nombre de Usuario: {item.NombreUsuario}</Text>
            <View style={{marginTop:10, width:120, marginLeft:120, backgroundColor:'mediumaquamarine'}}>
              <Button type="clear" onPress={() => this.props.navigation.navigate('Compra de Producto')} icon={ <Fontisto name="shopping-basket-add" style={{marginRight:8}} size={15} color="white"/>} title="Comprar"/>
            </View>
          </View>
          )}keyExtractor={item => item.Nombre}></FlatList>
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
      width:320,
      marginTop:5,
      marginLeft:20,
    },
    imagen:{
      width: 210,
      height: 210,
      marginLeft:80,
      marginBottom:10,
    },
})