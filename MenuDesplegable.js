import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import INICIO from './Inicio';
import PERFIL from './Perfil';
import ALTAPRODUCTO from './AltaProducto';
import ALTAPAGO from './AltaPago';
import CAMBIOSPERFIL from './CambiosPerfil';
import PRODUCTOSUSUARIO from './ProductosUsuario';
import CAMBIARPRODUCTO from './CambiarProducto';
import ALTADIRECCION from './AltaDireccion';
import MOSTRARDIRECCIONES from './MostrarDirecciones';
import MODIFICARDIRECCION from './ModificarDireccion';
import MOSTRARPAGOS from './MostrarPagos';

const Drawer = createDrawerNavigator();

export default function MenuDesplegable() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Pantalla Principal" screenOptions={() => ({drawerActiveBackgroundColor:'khaki'})}>
        <Drawer.Screen name="Pantalla Principal" component={INICIO} drawerStyle={{}} />
        <Drawer.Screen name="Detalles Perfil" component={PERFIL} />
        <Drawer.Screen name="Modificar Perfil" component={CAMBIOSPERFIL}/>
        <Drawer.Screen name="Publica Producto" component={ALTAPRODUCTO}/>
        <Drawer.Screen name="Compra de Producto" component={ALTAPAGO}/>
        <Drawer.Screen name="Mostrar Productos" component={PRODUCTOSUSUARIO}/>
        <Drawer.Screen name="Cambiar Producto" component={CAMBIARPRODUCTO}/>
        <Drawer.Screen name="Ingresar Dirección" component={ALTADIRECCION}/>
        <Drawer.Screen name="Mostrar Direcciones" component={MOSTRARDIRECCIONES}/>
        <Drawer.Screen name="Modificar Dirección" component={MODIFICARDIRECCION}/>
        <Drawer.Screen name="Mostrar Compras" component={MOSTRARPAGOS}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}