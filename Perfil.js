import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Button } from 'react-native-elements';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        correo:'',
        password:'',
        imagen:'',
        datos: [],
    };
  }

  render() {
    const buscarUsuario = () => {
      let _this = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({datos: temp});
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/buscarUsuario.php?correo=" + this.state.correo + "&password=" + this.state.password);
      xhttp.send();
    }

    function ejecutarFunciones(){
      confirmarAlerta();
      eliminaUsuario();
      regresar();
    }

    function confirmarAlerta(){
      console.log("Confirmado");
    }
    
    const eliminarUsuario = () => {
      Alert.alert("¿Está seguro de eliminar su cuenta?", "¿De verdad quiere eliminar sus datos?",[{
        text: "No", onPress: () => console.log("Cancelado"), style: "cancel"
      }, { text: "Si", onPress: ejecutarFunciones }]);
    }
    
    const regresar = () => {
      this.props.navigation.navigate('Pantalla Principal');
    }
    
    const eliminaUsuario = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText==1){
            Alert.alert("Cuenta eliminada", "Sus datos fueron eliminados exitosamente",[{
                  text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }else{
            Alert.alert("Error al eliminar el usuario", "Hubo un error al eliminar los datos de usuario",[{
              text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
            }, { text: "OK", onPress: () => console.log("OK Presionado") }]
            );
          }
        }
      };
      xhttp.open("GET", "https://sitio1pro.online/eliminarUsuario.php?correo=" + this.state.correo + "&password=" + this.state.password);
      xhttp.send();
  }

    return (
      <View style={{backgroundColor:'lightgreen'}}>
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.titulo}> Detalles del Perfil </Text>
        <View style={styles.correo}>
        <SearchBar placeholder="Buscar correo" onChangeText={(correo)=> this.setState({correo})} value={this.state.correo}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='email-search' size={24} />} style={{color:'black'}}/>
        </View>
        <View style={styles.password}>
        <SearchBar placeholder="Buscar contraseña" onChangeText={(password)=> this.setState({password})} value={this.state.password}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='shield-search' size={24} />} style={{color:'black'}} secureTextEntry={true}/>
        </View>
        <View>
        <FlatList onAccessibilityAction={buscarUsuario()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
            <Text style={{backgroundColor:'blue', color:'white', padding:8, width:380}}>Nombre: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:8, width:380}}>Correo electrónico: {item.Correo}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:8, width:380}}>Fecha de Nacimiento: {item.FechaNacimiento}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:8, width:380}}>Saldo: ${item.Saldo}</Text>
            <View style={{marginTop:10, width:180, marginLeft:80, backgroundColor:'burlywood'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Ingresar Dirección')} icon={ <AntDesign name="home" style={{marginRight:8}} size={15} color="brown"/>} title="Agregar dirección"/>
        </View>
          <View style={{marginTop:10, width:160, marginLeft:90, backgroundColor:'mediumaquamarine'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Modificar Perfil')} icon={ <Icon name="pencil" style={{marginRight:8}} size={15} color="white"/>} title="Modificar perfil"/>
        </View>
        <View style={{marginTop:10, width:160, marginLeft:90, backgroundColor:'lightgoldenrodyellow'}}>
          <Button type="clear" onPress={eliminarUsuario} icon={ <AntDesign name="deleteuser" style={{marginRight:8}} size={15} color="blue"/>} title="Eliminar cuenta"/>
        </View>
          </View>
          )}keyExtractor={item => item.Correo}></FlatList>
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
        color:'black',
    },
    correo:{
      width:320,
      marginTop:5,
      marginLeft:20,
    },
    password:{
      width:280,
      marginLeft:20,
    },
    imagen:{
      width:150,
      height:200,
      marginLeft:100,
      marginBottom:5,
    },
})