import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

export default class Listas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
    };
  }

  componentDidMount = () => {
    let _this = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({datos: temp});
      }
    }
    xhttp.open('GET','https://sitio1pro.online/mostrar.php');
    xhttp.send();
  }

  render() {
    return (
      <View style={{backgroundColor:'khaki'}}>
        <Text style={styles.titulo}> Listas </Text>
        <FlatList style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:5}}>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Nombre: {item.Nombre}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Código: {item.Codigo}</Text>
            <Text style={{backgroundColor:'blue', color:'white', padding:10, width:255}}>Centro: {item.Centro}</Text>
            <Image source={{uri: item.Imagen}} style={styles.imagen}/>
          </View>
          )}keyExtractor={item => item.Codigo}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo:{
    fontSize:40,
    textAlign:'center',
  },
  imagen:{
    width: 93.75,
    height: 112.5,
    marginLeft:260,
    marginTop:-115,
  },
})
