import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import SignupScreen from '@/screens/SignupScreen'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator