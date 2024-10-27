import { View, Text, TouchableOpacity, Image, TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/constants/Nav'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

interface RegisterResponse {
  message: string;
}

const SignupScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    console.log('Attempting to register with:', { email, password }); // Log email and password

    try {
        const response = await axios.post<RegisterResponse>('http://localhost:5001/register', {
            email,
            password,
        });

        console.log('Registration response:', response.data); // Log the successful response
        setMessage('Registration successful!');
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const responseData = axiosError.response.data as RegisterResponse;
          console.log('Registration error response:', responseData); // Log the error response
          setMessage(responseData.message);
        } else {
          console.log('Registration failed with error:', error); // Log the error object
          setMessage('An error occurred during registration.');
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

      <View className="flex-1 justify-center space-y-5 items-center">
        <Text className="text-3xl text-center">
          <Text className="font-bold">Create Account</Text>{'\n'}to get started now!
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
        <TextInput
          className="h-12 border px-3 w-11/12 rounded-lg"
          placeholder="Confirm Password"
          placeholderTextColor="#6b7280"
        />
      </View>

      <View className="w-full mt-auto mb-5">
        <Pressable 
          className="bg-black py-4 rounded-lg items-center w-full"
          onPressOut={handleSignup}  
        >
          <Text className="text-white">Sign Up</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center my-4">
        <View className="flex-1 h-0.5 bg-gray-300" />

        <Text className="text-gray-500 mx-4">Or Signup With</Text>

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
          Already have an account?{' '}
          <Text className="text-blue-500" onPress={() => navigation.navigate("Login")}>
            Login Now
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default SignupScreen