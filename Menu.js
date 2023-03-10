import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ALTAS from './Altas';
import LISTAS from './Listas';
import CAMBIOS from './Cambios';
import BUSQUEDAS from './Busquedas';
import BAJAS from './Bajas';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Altas') {
              iconName = focused
                ? 'person-add'
                : 'person-add-outline';
            } else if (route.name === 'Listas') {
              iconName = focused ? 'list' : 'list-outline';
            }
            else if (route.name === 'Cambios') {
              iconName = focused ? 'ios-pencil' : 'ios-pencil-outline';
            }
            else if (route.name === 'Búsquedas') {
              iconName = focused ? 'search' : 'search-outline';
            }
            else if (route.name === 'Bajas') {
              iconName = focused ? 'delete' : 'delete-outline';
              return <Icon name={iconName} size={size} color={color} />;
            }

          return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'orange',
        })}
      >
        <Tab.Screen name="Altas" component={ALTAS} />
        <Tab.Screen name="Listas" component={LISTAS} />
        <Tab.Screen name="Cambios" component={CAMBIOS} />
        <Tab.Screen name="Búsquedas" component={BUSQUEDAS} />
        <Tab.Screen name="Bajas" component={BAJAS}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}