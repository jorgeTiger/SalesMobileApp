import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { SearchBar, Button } from 'react-native-elements';

export default class MostrarDirecciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombreUsuario:'',
        datos: [],
    };
  }

  render() {
    const mostrarDirecciones = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/mostrarDirecciones.php?nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
    }

    function ejecutarFunciones(){
      confirmarAlerta();
      eliminaDireccion();
      regresar();
    }

    function confirmarAlerta(){
      console.log("Confirmado");
    }

    const eliminarDireccion = () => {
      Alert.alert("¿Está seguro de eliminar la dirección?", "¿De verdad quiere eliminar la dirección?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }
    
    const regresar = () => {
      this.props.navigation.navigate('Pantalla Principal');
    }
    
    const eliminaDireccion = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Dirección eliminada", "La dirección fue eliminada exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al eliminar la dirección", "Hubo un error al eliminar los datos de la dirección",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/eliminarDireccion.php?nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
  }

    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.titulo}> Direcciones </Text>
        <View style={styles.nombreUsuario}>
        <SearchBar placeholder="Buscar usuario" onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} value={this.state.nombreUsuario} searchIcon={<MaterialCommunityIcons name='account-search' size={24} />}lightTheme={true} style={{color:'black'}}/>
        </View>
        <View>
        <FlatList onAccessibilityAction={mostrarDirecciones()} style={{marginTop:20}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Nombre de Usuario: {item.NombreUsuario}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Calle: {item.Calle}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Número: {item.Numero}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Colonia: {item.Colonia}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Código Postal: {item.CodigoPostal}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Municipio: {item.Municipio}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Estado: {item.Estado}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>País: {item.Pais}</Text>
            <Text style={{backgroundColor:'blue', fontSize:15, color:'white', padding:5, width:360}}>Teléfono: {item.Telefono}</Text>
            <View style={{marginTop:10, width:200, marginLeft:80, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Compra de Producto')} icon={ <EvilIcons name="location" style={{marginRight:5}} size={20} color="blue"/>} title="Seleccionar dirección"/>
        </View>
          <View style={{marginTop:10, width:180, marginLeft:90, backgroundColor:'mediumaquamarine'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Modificar Dirección')} icon={ <Icon name="pencil" style={{marginRight:8}} size={15} color="blue"/>} title="Modificar dirección"/>
        </View>
        <View style={{marginTop:10, width:180, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={eliminarDireccion} icon={ <MaterialCommunityIcons name="delete-forever" style={{marginRight:8}} size={15} color="blue"/>} title="Eliminar dirección"/>
        </View>
          </View>
          )}keyExtractor={item => item.NombreUsuario}></FlatList>
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
})