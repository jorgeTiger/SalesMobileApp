import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Button } from 'react-native-elements';

export default class MostrarPagos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreUsuario:'',
      saldo:0,
      datos: [],
    };
  }

  render() {
    const buscarPago = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/mostrarPagos.php?nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
    }

    function mostrarAlerta(){
      console.log("Confirmado");
    }

    function ejecutarFunciones(){
      mostrarAlerta();
      sumaSaldo();
      eliminaPago();
      regresar();
    }

    function sumaSaldo(){
      mostrarAlerta();
      sumarSaldo();
      mostrarAlertaAleatoria();
    }

    const eliminarPago = () => {
      Alert.alert("¿Está seguro de cancelar la compra?", "¿De verdad quiere devolver el producto?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }
    
    const regresar = () => {
      this.props.navigation.navigate('Pantalla Principal');
    }

    const eliminaPago = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Compra cancelada", "Los datos de la compra fueron eliminados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al cancelar la compra", "Hubo un error al eliminar los datos de compra",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/eliminarPago.php?nombreUsuario=" + this.state.nombreUsuario);
      xhttp.send();
    }
    
    const sumarSaldo = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Saldo actualizado", "El saldo del usuario fue actualizado a " + this.state.saldo,[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado"), getRandomArbitrary }]
            );
          }else{
            Alert.alert("Error al actualizar el saldo", "Hubo un error al actualizar el saldo del usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/actualizarSaldo.php?nombre=" + this.state.nombreUsuario + "&saldo=" + this.state.saldo);
      xhttp.send();
    }

    function getRandomArbitrary(min, max) {
      return Math.floor((Math.random() * (max - min)) + min);
    }

    function mostrarAlertaAleatoria(){
      Alert.alert("Código de regalo activado", "Su código de regalo es: " + getRandomArbitrary(0,99999999) [{
        text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "OK", onPress: () => console.log("OK Presionado") }]);
    }

    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.titulo}> Compras realizadas </Text>
        <View style={styles.nombreUsuario}>
        <SearchBar placeholder="Buscar usuario" onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} value={this.state.nombreUsuario} searchIcon={<Icon name='account-search' size={24} />}lightTheme={true} style={{color:'black'}}/>
        </View>
        <View>
        <FlatList onAccessibilityAction={buscarPago()} style={{marginTop:20}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Número de Tarjeta: {item.NumeroTarjeta}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Tipo de Tarjeta: {item.TipoTarjeta}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Marca de Tarjeta: {item.MarcaTarjeta}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Nombre de Banco: {item.NombreBanco}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Producto Comprado: {item.NombreProducto}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Cantidad comprada: ${item.Monto}</Text>
            <Text style={{backgroundColor:'blue', fontSize:14, color:'white', padding:5, width:360}}>Fecha de compra: {item.Fecha}</Text>
        <View style={{marginTop:20, width:180, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onAccessibilityAction={this.state.saldo = this.state.saldo + item.Monto} onPress={eliminarPago} icon={ <Icon name="cancel" style={{marginRight:8}} size={15} color="blue"/>} title="Cancelar compra"/>
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
        fontSize:36,
        textAlign:'center',
        color:'black',
    },
    nombreUsuario:{
      width:300,
      marginTop:5,
      marginLeft:20,
    },
})