import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button, SearchBar } from 'react-native-elements';

export default class CambiarPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        correo:'',
        password:'',
        datos:[],
    };
  }

  render() {
    const buscarPassword = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/buscarCorreo.php?correo=" + this.state.correo);
      xhttp.send();
    }

    function ejecutarFunciones(){
      mostrarConfirmacionAlerta();
      cambiarPassword();
      regresar();
    }

    function mostrarConfirmacionAlerta(){
      console.log("Confirmado");
    }

    const modificarPassword = () => {
      Alert.alert("¿Está seguro de modificar la contraseña?", "¿De verdad quiere cambiar su contraseña?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }

    const regresar = () => {
      this.props.navigation.navigate('Inicio de Sesión');
    }
    
    const cambiarPassword = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Contraseña modificada", "Sus contraseña fue cambiada exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al cambiar la contraseña", "Hubo un error al guardar la nueva contraseña",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/modificarPassword.php?correo=" + this.state.correo + "&password=" + this.state.password);
      xhttp.send();
    }
    
    return (
      <View style={{backgroundColor:'lightblue'}}>
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Inicio de Sesión')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Cambio de Contraseña </Text>
        <View style={styles.correo}>
        <SearchBar placeholder='Buscar correo' onChangeText={(correo)=> this.setState({correo})} value={this.state.correo} searchIcon={<MaterialCommunityIcons name='email-search' size={24} />} lightTheme={true} style={{color:'black'}}/>
        </View>
        <FlatList onAccessibilityAction={buscarPassword()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={styles.password}>
          <Input label='Contraseña antigua' placeholder='Contraseña antigua' value={item.Password} leftIcon={ <Icon name='lock' size={24} color='gold'/>}
            secureTextEntry={true}/>
          <Input label='Contraseña nueva' placeholder='Contraseña nueva' onChangeText={(password)=> this.setState({password})} leftIcon={
            <Icon name='lock' size={24} color='gold'/>}
            secureTextEntry={true}/>
          <View style={{width:180, marginLeft:60, backgroundColor:'burlywood'}}>
            <Button type="clear" onPress={modificarPassword} icon={ <Icon name="pencil" style={{marginRight:3}} size={15} color="blue"/>} title="Cambiar contraseña"/>
          </View>
          </View>
          )}keyExtractor={item => item.Correo}></FlatList>
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
    correo:{
        width:320,
        marginLeft:20,
        marginTop:10,
    },
    password:{
        width:260,
        marginLeft:20,
        marginTop:10,
    },
})