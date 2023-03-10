import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import { Input, Button, SearchBar } from 'react-native-elements';

export default class AltaUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
        numeroTarjeta:'',
        nombreUsuario:'',
        tipoTarjeta:'',
        marcaTarjeta:'',
        nombreBanco:'',
        nombreProducto:'',
        monto:'',
        fecha:'',
        datos:[],
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
      xhttp.open("GET", "https://sitio1pro.online/buscarProducto.php?nombre=" + this.state.nombreProducto);
      xhttp.send();
    }

    const altaPago = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            if(xhttp.responseText==1){
              Alert.alert("Compra realizada", "Los datos de compra fueron guardados exitosamente",[{
                    text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
                  }, { text: "OK", onPress: () => console.log("OK Presionado") }]
              );
            }else{
              Alert.alert("Error al registrar la compra", "Hubo un error al guardar los datos de compra",[{
                text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel"
              }, { text: "OK", onPress: () => console.log("OK Presionado") }]
              );
            }
          }
        };
        xhttp.open("GET", "https://sitio1pro.online/altaPago.php?numeroTarjeta=" + this.state.numeroTarjeta + "&nombreUsuario="+ this.state.nombreUsuario + 
        "&tipoTarjeta=" + this.state.tipoTarjeta + "&marcaTarjeta=" +  this.state.marcaTarjeta + "&nombreBanco=" + this.state.nombreBanco + "&nombreProducto=" + this.state.nombreProducto + "&monto=" + this.state.monto + "&fecha=" + this.state.fecha, true);
        xhttp.send();
    }
    
    return (
      <View style={{backgroundColor:'lightblue'}}>
      <SafeAreaView>
        <ScrollView>
        <View style={{width:100, marginLeft:20, marginTop:5, backgroundColor:'lightsalmon'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Pantalla Principal')} icon={ <AntDesign name="back" style={{marginRight:5}} size={15} color="blue"/>} title="Regresar"/>
        </View>
        <Text style={styles.titulo}> Compra de Producto </Text>
        <View style={styles.nombreProducto}>
          <SearchBar placeholder="Buscar producto" onChangeText={(nombreProducto)=> this.setState({nombreProducto})} value={this.state.nombreProducto}
        lightTheme={true} searchIcon={<MaterialCommunityIcons name='shopping-search' size={24} />} style={{color:'black'}}/>
        </View>
        <FlatList onAccessibilityAction={buscarProducto()} style={{marginTop:10}} data={this.state.datos} renderItem={({item}) => (
          <View style={{justifyContent: 'center', marginBottom:10}}>
            <View style={styles.numeroTarjeta}>
        <Input placeholder='Número de Tarjeta' onChangeText={(numeroTarjeta)=> this.setState({numeroTarjeta})} leftIcon={ <Entypo name='credit-card' size={22} color='orange'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.nombreUsuario}>
        <Input placeholder='Nombre de usuario' value={item.NombreUsuario} onChangeText={(nombreUsuario)=> this.setState({nombreUsuario})} leftIcon={ <Icon name='user' size={22} color='crimson'/>
          }/>
        </View>
        <View>
            <Text style={{fontSize:20,marginLeft:30,color:'black'}}>Tipo de Tarjeta <Ionicons name='card' size={22} color='black'/></Text>
            <Picker selectedValue={this.state.tipoTarjeta} onValueChange={(tipoTarjeta)=> this.setState({tipoTarjeta})} style={{ height: 50, width: 150, marginLeft:20 }}>
              <Picker.Item label="Credito" value="Credito" />
              <Picker.Item label="Debito" value="Debito" />
              <Picker.Item label="Regalo" value="Regalo" />
            </Picker>
        </View>
        <View>
            <Text style={{fontSize:20,marginLeft:30,color:'black'}}>Marca de Tarjeta <AntDesign name='creditcard' size={22} color='black'/></Text>
            <Picker selectedValue={this.state.marcaTarjeta} onValueChange={(marcaTarjeta)=> this.setState({marcaTarjeta})} style={{ height: 50, width: 210, marginLeft:20 }}>
              <Picker.Item label="Visa" value="Visa" />
              <Picker.Item label="Master Card" value="Master Card" />
              <Picker.Item label="American Express" value="American Express" />
              <Picker.Item label="Discover" value="Discover" />
              <Picker.Item label="Dinners Club" value="Dinners Club" />
              <Picker.Item label="JCB" value="JCB" />
              <Picker.Item label="Union Pay" value="Union Pay" />
              <Picker.Item label="Mir" value="Mir" />
            </Picker>
        </View>
        <View style={styles.nombreBanco}>
        <Input placeholder='Nombre de Banco' onChangeText={(nombreBanco)=> this.setState({nombreBanco})} leftIcon={<Icon name='bank' size={24} color='brown'/>}/>
        </View>
        <View style={styles.nombreProducto}>
        <Input placeholder='Nombre de Producto' value={item.Nombre} onChangeText={(nombreProducto)=> this.setState({nombreProducto})} leftIcon={<Fontisto name='shopping-package' size={24} color='red'/>}/>
        </View>
        <View style={styles.cantidad}>
          <Input placeholder='Monto' value={item.Precio} onChangeText={(monto)=> this.setState({monto})} leftIcon={<FontAwesome5 name='dollar-sign' size={24} color='green'/>} keyboardType='phone-pad'/>
        </View>
        <View style={styles.fecha}>
        <Text style={{fontSize:20, color:'black'}}>Fecha de Pago</Text>
        <DatePicker style={{width: 200, marginTop:10}} date={this.state.fecha}
        mode="date" placeholder="Elige una fecha" format="YYYY-MM-DD" minDate="2020-01-01" maxDate="2200-12-31"
        confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{
          dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
          dateInput: { marginLeft: 36 }
        }} onDateChange={(fecha) => {this.setState({fecha})}}/>
        </View>
        <View style={{width:200, marginLeft:70, marginTop:15, backgroundColor:'lightsalmon'}}>
          <Button type="clear" onPress={() => this.props.navigation.navigate('Mostrar Direcciones')} icon={ <FontAwesome5 name="location-arrow" style={{marginRight:5}} size={18} color="black"/>} title="Seleccionar dirección"/>
        </View>
        <View style={{width:100, marginTop:10, marginLeft:120, backgroundColor:'lightsalmon'}}>
          <Button type="clear" onPress={altaPago} icon={ <MaterialIcons name="add-shopping-cart" style={{marginRight:5}} size={18} color="brown"/>} title="Comprar"/>
        </View>
          </View>
          )}keyExtractor={item => item.Nombre}></FlatList>
      </ScrollView>
      </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        fontSize:38,
        textAlign:'center',
        marginTop:5,
        color:'black',
    },
    numeroTarjeta:{
        width:260,
        marginLeft:20,
        marginTop:10,
    },
    nombreUsuario:{
      width:320,
      marginLeft:20,
    },
    nombreBanco:{
        width:280,
        marginLeft:20,
    },
    nombreProducto:{
        width:280,
        marginLeft:20,
    },
    cantidad:{
        width:180,
        marginLeft:20,
    },
    fecha:{
        width:220,
        marginLeft:30,
    },
})