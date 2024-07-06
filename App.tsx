/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

// import MainStackNavigator from './src/navigator/MainStackNavigator';
import BottomTabNavigator from './src/navigator/BottomTabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        {/* <MainStackNavigator /> */}
        <BottomTabNavigator />
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;
