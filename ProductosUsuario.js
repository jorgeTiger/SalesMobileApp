import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Button } from 'react-native-elements';

export default class ProductosUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre: '',
        tipo:'',
        marca:'',
        precio:'',
        descripcion:'',
        imagen:'',
        fechaPublicacion:'',
        nombreUsuario:'',
        rutai:'',
        datos: [],
    };
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
      xhttp.open("GET", "https://sitio1pro.online/mostrarProductos.php?nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
    }

    function ejecutarFunciones(){
      confirmarAlerta();
      eliminaProducto();
      regresar();
    }

    function confirmarAlerta(){
      console.log("Confirmado");
    }

    const eliminarProducto = () => {
      Alert.alert("¿Está seguro de eliminar el producto?", "¿De verdad quiere eliminar los datos del producto?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }
    
    const regresar = () => {
      this.props.navigation.navigate('Pantalla Principal');
    }

    const eliminaProducto = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Producto eliminado", "El producto fue eliminado exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al eliminar el producto", "Hubo un error al eliminar los datos del producto",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/eliminarProducto.php?nombre=" + this.state.nombre + "&nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
  }

    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.titulo}> Productos publicados </Text>
        <View style={styles.nombreUsuario}>
        <SearchBar placeholder="Buscar usuario" onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} value={this.state.nombreUsuario} searchIcon={<MaterialCommunityIcons name='account-search' size={24} />}lightTheme={true} style={{color:'black'}}/>
        </View>
        <View>
        <FlatList onAccessibilityAction={buscarProducto()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Nombre: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Tipo: {item.Tipo}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Marca: {item.Marca}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Precio: ${item.Precio}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Descripción: {item.Descripcion}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Fecha de Publicación: {item.FechaPublicacion}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:5, width:360}}>Nombre de Usuario: {item.NombreUsuario}</Text>
          <View style={{marginTop:10, width:180, marginLeft:90, backgroundColor:'mediumaquamarine'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Cambiar Producto')} icon={ <Icon name="pencil" style={{marginRight:8}} size={15} color="white"/>} title="Modificar producto"/>
        </View>
        <View style={{marginTop:10, width:180, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={eliminarProducto} icon={ <MaterialCommunityIcons name="delete-forever" style={{marginRight:8}} size={15} color="blue"/>} title="Eliminar producto"/>
        </View>
          </View>
          )}keyExtractor={item => item.Nombre}></FlatList>
        </View>
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
        color:'black',
    },
    nombreUsuario:{
      width:300,
      marginTop:5,
      marginLeft:20,
    },
    imagen:{
      width:200,
      height:180,
      marginLeft:80,
      marginBottom:5,
    },
})