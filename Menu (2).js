import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from './Login';
import ALTAUSUARIO from './AltaUsuario';
import CAMBIARPASSWORD from './CambiarPassword';
import MENUDESPLEGABLE from './MenuDesplegable';

const Stack = createNativeStackNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Inicio de Sesión" screenOptions={() => ({headerShown:false})}>
      <Stack.Screen name="Inicio de Sesión" component={LOGIN}/>
      <Stack.Screen name="Menú Desplegable" component={MENUDESPLEGABLE}/>
      <Stack.Screen name="Alta de Usuario" component={ALTAUSUARIO}/>
      <Stack.Screen name="Cambio de Contraseña" component={CAMBIARPASSWORD}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}