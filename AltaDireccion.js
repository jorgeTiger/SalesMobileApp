import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';

export default class AltaDireccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombreUsuario:'',
        calle:'',
        numero:'',
        colonia:'',
        codigoPostal:'',
        municipio:'',
        estado:'',
        pais:'',
        telefono:'',
    };
  }

  render() {
    const altaDireccion = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            if(xhttp.responseText==1){
              Alert.alert("Dirección guardada", "Sus datos fueron guardados exitosamente",[{
                    text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                  }, { text: "OK", onPress: () => console.log("OK Presionado") }]
              );
            }else{
              Alert.alert("Error al registrar la dirección", "Hubo un error al guardar los datos de la dirección",[{
                text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
              }, { text: "OK", onPress: () => console.log("OK Presionado") }]
              );
            }
          }
        };
        xhttp.open("GET", "https://sitio1pro.online/altaDireccion.php?nombreUsuario="+ this.state.nombreUsuario + "&calle=" + this.state.calle + "&numero=" + this.state.numero +
        "&colonia=" +  this.state.colonia + "&codigoPostal=" + this.state.codigoPostal + "&municipio=" + this.state.municipio + "&estado=" + this.state.estado + "&pais=" + this.state.pais + "&telefono=" + this.state.telefono, true);
        xhttp.send();
    }
    
    return (
      <View style={{backgroundColor:'lightblue'}}>
      <SafeAreaView>
        <ScrollView>
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Detalles Perfil')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Alta de Dirección </Text>
        <View style={styles.nombreUsuario}>
        <Input placeholder='Nombre de Usuario' onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} leftIcon={ <Icon name='user' size={22} color='tomato'/>
          }/>
        </View>
        <View style={styles.calle}>
        <Input placeholder='Calle' onChangeText={(calle)=> this.setState({calle})} leftIcon={ <MaterialIcons name='location-history' size={24} color='black'/>}/>
        </View>
        <View style={styles.numero}>
        <Input placeholder='Número' onChangeText={(numero)=> this.setState({numero})} leftIcon={ <Entypo name='location-pin' size={24} color='crimson'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.colonia}>
        <Input placeholder='Colonia' onChangeText={(colonia)=> this.setState({colonia})} leftIcon={ <MaterialIcons name='my-location' size={22} color='blue'/>}/>
        </View>
        <View style={styles.codigoPostal}>
        <Input placeholder='Código Postal' onChangeText={(codigoPostal)=> this.setState({codigoPostal})} leftIcon={<Entypo name='location' size={24} color='brown'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.municipio}>
        <Input placeholder='Municipio' onChangeText={(municipio)=> this.setState({municipio})} leftIcon={<MaterialIcons name='location-city' size={24} color='orange'/>}/>
        </View>
        <View style={styles.estado}>
          <Input placeholder='Estado' onChangeText={(estado)=> this.setState({estado})} leftIcon={<Icon name='location-arrow' size={24} color='yellow'/>}/>
        </View>
        <View style={styles.pais}>
          <Input placeholder='País' onChangeText={(pais)=> this.setState({pais})} leftIcon={<AntDesign name='flag' size={22} color='blue'/>}/>
        </View>
        <View style={styles.telefono}>
        <Input placeholder='Teléfono' onChangeText={(telefono)=> this.setState({telefono})} leftIcon={ <AntDesign name='phone' size={22} color='green'/>} keyboardType='phone-pad'/>
        </View>
        <View style={{width:100, marginLeft:120, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={altaDireccion} icon={ <MaterialIcons name="add-location-alt" style={{marginRight:5}} size={18} color="blue"/>} title="Guardar"/>
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
    nombreUsuario:{
        width:320,
        marginLeft:20,
        marginTop:10,
    },
    calle:{
        width:300,
        marginLeft:20,
    },
    numero:{
        width:220,
        marginLeft:20,
    },
    colonia:{
        width:300,
        marginLeft:20,
    },
    codigoPostal:{
        width:170,
        marginLeft:20,
    },
    municipio:{
        width:280,
        marginLeft:20,
    },
    estado:{
        width:280,
        marginLeft:20,
    },
    pais:{
        width:280,
        marginLeft:20,
    },
    telefono:{
        width:180,
        marginLeft:20,
    },
})