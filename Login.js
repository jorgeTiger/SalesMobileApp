import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Input, Button } from 'react-native-elements';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        correo:'',
        password:'',
    };
  }

  render() {
    const cambiarVentana = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(xhttp.responseText==="0"){
            Alert.alert("Datos incorrectos", "Ingrese datos válidos para entrar",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]);
          }else{
           _this.props.navigation.navigate('Menú Desplegable');
          console.log(xhttp.responseText);
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/buscarUsuario.php?correo=" + this.state.correo + "&password=" + this.state.password);
      xhttp.send();
    }
    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <Text style={styles.titulo}> Ventas </Text>
        <View style={styles.correo}>
        <Input label='Correo electrónico' placeholder='Correo electrónico' onChangeText={(correo)=> this.setState({correo})} leftIcon={ <Entypo name='email' size={22} color='black'/>
          }/>
        </View>
        <View style={styles.password}>
        <Input label='Contraseña' placeholder='Contraseña' onChangeText={(password)=> this.setState({password})} leftIcon={<Icon name='lock' size={24} color='gold'/>}
          secureTextEntry={true}/>
        </View>
         <Text onPress={() => this.props.navigation.navigate('Cambio de Contraseña')} style={{fontSize:16,marginLeft:80, color:'blue',textDecorationLine: 'underline'}}>¿Olvidaste tu contraseña?</Text>
        <View style={{marginTop:10, width:160, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={cambiarVentana} icon={ <Entypo name="login" style={{marginRight:8}} size={15} color="blue"/>} title="Inicia Sesión"/>
        </View>
        <Text style={{fontSize:16,marginLeft:100, marginTop:15, color:'black'}}>¿No tienes cuenta?</Text>
        <Text onPress={() => this.props.navigation.navigate('Alta de Usuario')} style={{fontSize:16,marginLeft:130,color:'blue',textDecorationLine: 'underline'}}>Regístrate</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:40,
        color:'black',
        textAlign:'center',
        marginTop:40,
    },
    correo:{
        width:330,
        marginTop:20,
        marginLeft:10,
    },
    password:{
        width:260,
        marginTop:20,
        marginLeft:10,
    },
})