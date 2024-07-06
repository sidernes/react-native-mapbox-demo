import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CloudHail, Route, MapPinned} from 'lucide-react-native';

import RutasScreen from '../MdRutas/RutasScreen';
import UbicacionesScreen from '../MdUbicaciones/UbicacionesScreen';
import PrecipitacionesScreen from '../MdPrecipitaciones/PrecipitacionesScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: 'transparent',
          elevation: 0,
        }}
        screenOptions={({route}) => ({
          header: () => null,
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            let bgColor = focused ? '#1a91ff' : 'transparent';
            if (route.name === 'RutasScreen') {
              icon = (
                <View
                  style={{...styles.iconContainer, backgroundColor: bgColor}}>
                  <Route
                    size={size ? size : 25}
                    color={focused ? '#fff' : color}
                  />
                </View>
              );
            } else if (route.name === 'UbicacionesScreen') {
              icon = (
                <View
                  style={{...styles.iconContainer, backgroundColor: bgColor}}>
                  <MapPinned
                    size={size ? size : 25}
                    color={focused ? '#fff' : color}
                  />
                </View>
              );
            } else if (route.name === 'PrecipitacionesScreen') {
              icon = (
                <View
                  style={{...styles.iconContainer, backgroundColor: bgColor}}>
                  <CloudHail
                    size={size ? size : 25}
                    color={focused ? '#fff' : color}
                  />
                </View>
              );
            }
            return icon;
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            ...bottonTabStyles.tabBarStyle,
            backgroundColor: '#fafafa', // Cambiado a blanco para mejorar el diseño
          },
          tabBarActiveTintColor: '#1a91ff', // Color activo para el icono
          tabBarInactiveTintColor: '#888', // Color inactivo para el icono
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen name="RutasScreen" component={RutasScreen} />
        <Tab.Screen
          name="UbicacionesScreen"
          component={UbicacionesScreen}
          options={{
            tabBarBadgeStyle: {backgroundColor: 'red'},
          }}
        />
        <Tab.Screen
          name="PrecipitacionesScreen"
          component={PrecipitacionesScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});

const bottonTabStyles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 0.5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -35}],
    backgroundColor: '#1a91ff',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
