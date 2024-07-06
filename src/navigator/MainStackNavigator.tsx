import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, ProductsScreen, SettingsScreen} from '../screens';
import IntroductionAnimationScreen from '../carousel/IntroductionAnimationScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IntroductionAnimationScreen"
        component={IntroductionAnimationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
