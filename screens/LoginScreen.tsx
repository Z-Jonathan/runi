import { View, Text, TouchableOpacity, TextInput, Pressable, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/constants/Nav'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

interface LoginResponse {
  token: string;
  message: string;
}

const LoginScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    console.log('Attempting to login with:', { email, password }); // Log email and password

    try {
        const response = await axios.post<LoginResponse>('http://localhost:5001/login', {
            email,
            password,
        });

        // Check if the token exists in the response
        if (response.data.token) {
            // Store the token in AsyncStorage
            await AsyncStorage.setItem('authToken', response.data.token);
            
            console.log('Login Response:', response.data); // Log the successful response
            setMessage('Login successful!'); // Set success message for the user
        } else {
            console.log('No token received in response:', response.data);
            setMessage('Login failed: No token received.');
        }
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            const responseData = axiosError.response.data as LoginResponse;

            console.log('Login error response:', responseData); // Log the error response
            setMessage(responseData.message || 'Login failed.');
        } else {
            console.log('Login failed with error:', error); // Log the error object
            setMessage('An error occurred during login.');
        }
    }
  };


  return (
    <View className="flex-1 bg-white p-5">
      <View className="absolute left-0 top-0 px-2 py-1">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={28} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center space-y-6 items-center">
        <Text className="text-3xl text-center">
          <Text className="font-bold">Welcome,</Text>{'\n'}Glad to see you!
        </Text>

        <TextInput
          className="h-12 border px-3 w-11/12 rounded-lg"
          placeholder="Email Address"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="h-12 border px-3 w-11/12 rounded-lg"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity className="self-end pr-5">
          <Text className="text-blue-500">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mt-auto mb-5">
        <Pressable 
          className="bg-black py-4 rounded-lg items-center w-full"
          onPressOut={handleLogin}
        >
          <Text className="text-white">Login</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-0.5 bg-gray-300" />

        <Text className="text-gray-500 mx-4">Or Login With</Text>

        <View className="flex-1 h-0.5 bg-gray-300" />
      </View>

      <View className="flex-row justify-center space-x-4 w-full mb-24">
        <Pressable className="bg-white flex-row items-center justify-center p-3 rounded-lg border border-gray-300 w-1/2">
          <Image
            source={require('@/assets/images/GoogleLogo.png')}
            className="w-6 h-6"
          />
        </Pressable>
        <Pressable className="bg-white flex-row items-center justify-center p-3 rounded-lg border border-gray-300 w-1/2">
          <Icon name="apple1" size={24} className="w-6 h-6" />
        </Pressable>
      </View>

      <View className="bottom-2.5 w-full items-center">
        <Text className="text-gray-500">
          Don't have an account?{' '}
          <Text className="text-blue-500" onPress={() => navigation.navigate("Signup")}>
            Sign Up Now
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default LoginScreen