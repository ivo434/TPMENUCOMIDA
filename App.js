import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/(tabs)/HomeScreen';
import DishSearchScreen from './app/(tabs)/DishSearchScreen';
import DishDetailScreen from './src/screens/DishDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Menu del Hotel' }}
        />
        <Stack.Screen 
          name="DishSearch" 
          component={DishSearchScreen} 
          options={{ title: 'Buscar Platos' }}
        />
        <Stack.Screen 
          name="DishDetail" 
          component={DishDetailScreen} 
          options={{ title: 'Detalle del Plato' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;