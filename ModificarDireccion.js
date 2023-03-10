import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SearchBar, Button, Input } from 'react-native-elements';

export default class ModificarDireccion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nombreUsuario:'',
        nuevoNombreUsuario:'',
        calle:'',
        numero:'',
        colonia:'',
        codigoPostal:'',
        municipio:'',
        estado:'',
        pais:'',
        telefono:'',
        datos: [],
    };
  }

  render() {
    const buscaDireccion = () => {
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
      mostrarConfirmacionAlerta();
      modificaDireccion();
      regresar();
    }

    function mostrarConfirmacionAlerta(){
      console.log("Confirmado");
    }

    const modificarDireccion = () => {
      Alert.alert("¿Está seguro de modificar la dirección?", "¿De verdad quiere cambiar su dirección?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }

    const modificaDireccion = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Dirección actualizada", "Sus datos fueron actualizados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al actualizar la dirección", "Hubo un error al actualizar la dirección",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/modificarDireccion.php?nombreUsuario=" + this.state.nombreUsuario + "&nuevoNombreUsuario=" + this.state.nuevoNombreUsuario  + "&calle=" + this.state.calle +
      "&numero=" + this.state.numero + "&colonia=" + this.state.colonia + "&codigoPostal=" + this.state.codigoPostal + "&municipio=" + this.state.municipio +
      "&estado=" + this.state.estado + "&pais=" + this.state.pais + "&telefono=" + this.state.telefono, true);
      xhttp.send();
  }
  
  const regresar = () => {
    this.props.navigation.navigate('Mostrar Direcciones');
  }

    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <SafeAreaView>
        <ScrollView>
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Mostrar Direcciones')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Modificar Dirección </Text>
        <View style={styles.nombreUsuario}>
        <SearchBar placeholder="Buscar usuario" onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} value={this.state.nombreUsuario} searchIcon={<MaterialCommunityIcons name='account-search' size={24} />}lightTheme={true} style={{color:'black'}}/>
        </View>
        <View>
        <FlatList onAccessibilityAction={buscaDireccion()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
          <View style={styles.nombreUsuario}>
        <Input label='Nombre de Usuario' placeholder='Nombre de Usuario' value={item.NombreUsuario} onChangeText={(nuevoNombreUsuario)=> this.setState({nuevoNombreUsuario})} leftIcon={ <Icon name='user' size={22} color='tomato'/>
          }/>
        </View>
        <View style={styles.calle}>
        <Input label='Calle' placeholder='Calle' value={item.Calle} onChangeText={(calle)=> this.setState({calle})} leftIcon={ <MaterialIcons name='location-history' size={24} color='black'/>}/>
        </View>
        <View style={styles.numero}>
        <Input label='Número' placeholder='Número' value={item.Numero} onChangeText={(numero)=> this.setState({numero})} leftIcon={ <Entypo name='location-pin' size={24} color='crimson'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.colonia}>
        <Input label='Colonia' placeholder='Colonia' value={item.Colonia} onChangeText={(colonia)=> this.setState({colonia})} leftIcon={ <MaterialIcons name='my-location' size={22} color='blue'/>}/>
        </View>
        <View style={styles.codigoPostal}>
        <Input label='Código Postal' placeholder='Código Postal' value={item.CodigoPostal} onChangeText={(codigoPostal)=> this.setState({codigoPostal})} leftIcon={<Entypo name='location' size={24} color='brown'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.municipio}>
        <Input label='Municipio' placeholder='Municipio' value={item.Municipio} onChangeText={(municipio)=> this.setState({municipio})} leftIcon={<MaterialIcons name='location-city' size={24} color='orange'/>}/>
        </View>
        <View style={styles.estado}>
          <Input label='Estado' placeholder='Estado' value={item.Estado} onChangeText={(estado)=> this.setState({estado})} leftIcon={<Icon name='location-arrow' size={24} color='yellow'/>}/>
        </View>
        <View style={styles.pais}>
          <Input label='País' placeholder='País' value={item.Pais} onChangeText={(pais)=> this.setState({pais})} leftIcon={<AntDesign name='flag' size={22} color='blue'/>}/>
        </View>
        <View style={styles.telefono}>
        <Input label='Teléfono' placeholder='Teléfono' value={item.Telefono} onChangeText={(telefono)=> this.setState({telefono})} leftIcon={ <AntDesign name='phone' size={22} color='green'/>} keyboardType='phone-pad'/>
        </View>
        <View style={{marginTop:5, width:180, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={modificarDireccion} icon={ <Icon name="pencil" style={{marginRight:8}} size={15} color="blue"/>} title="Modificar dirección"/>
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