import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

export default class Busquedas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        codigo:'',
        nombre:'',
        centro:'',
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
    xhttp.open("GET", "https://sitio1pro.online/buscar.php?codigo=" + this.state.codigo +
    "&nombre=" + this.state.nombre + "&centro=" + this.state.centro);
    xhttp.send();
  }

  render() {
    return (
      <SafeAreaView>
      <ScrollView>
      <View style={{backgroundColor:'lightblue'}}>
        <Text style={styles.titulo}> Búsquedas </Text>
        <View style={styles.codigo}>
        <SearchBar placeholder="Código" onChangeText={(codigo)=> this.setState({codigo})}
          value={this.state.codigo} searchIcon={<Icon name='text-search' size={24} color='black'/>}
          lightTheme={true} style={{color:'black'}} keyboardType='phone-pad'/>
        </View>
        <View style={styles.nombre}>
        <SearchBar placeholder="Nombre" onChangeText={(nombre)=> this.setState({nombre})}
          value={this.state.nombre} searchIcon={<MaterialIcons name='person-search' size={24}/>}
          lightTheme={true} style={{color:'black'}}/>
        </View>
        <View>
          <Text style={{fontSize:20,marginLeft:30,marginTop:10}}>Centro Universitario</Text>
          <Picker selectedValue={this.state.centro} onValueChange={(centro)=> this.setState({centro})}
            style={{ height: 50, width: 210, marginLeft:20 }}>
            <Picker.Item label="CUAAD" value="CUAAD" />
            <Picker.Item label="CUCBA" value="CUCBA" />
            <Picker.Item label="CUCEA" value="CUCEA" />
            <Picker.Item label="CUCEI" value="CUCEI" />
            <Picker.Item label="CUCS" value="CUCS" />
            <Picker.Item label="CUCSH" value="CUCSH" />
            <Picker.Item label="CUTLAJOMULCO" value="CUTLAJOMULCO" />
            <Picker.Item label="CUTONALA" value="CUTONALA" />
          </Picker>
        </View>
        <View>
        <FlatList style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Nombre: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Código: {item.Codigo}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Centro: {item.Centro}</Text>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
          </View>
          )}keyExtractor={item => item.Codigo}></FlatList>
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:40,
        textAlign:'center',
    },
    codigo:{
        width:260,
        marginTop:15,
        marginLeft:20,
    },
    nombre:{
        width:260,
        marginTop:10,
        marginLeft:20,
    },
    imagen:{
      width: 93.75,
      height: 112.5,
      marginLeft:260,
      marginTop:-115,
    },
})