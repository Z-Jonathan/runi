import { Pressable, View, Text, Image } from 'react-native'
import React from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/constants/Nav'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* Logo */}
      <Image
        source={require('@/assets/images/Logo.png')} // replace with your logo path
        className="w-32 h-32 mb-4"
        resizeMode="contain"
      />
      
      {/* App Name */}
      <Text className="text-3xl font-bold mb-8">Coordify</Text>

      {/* Login Button */}
      <Pressable 
        className="w-64 p-4 bg-black rounded-full mb-4"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-white text-lg text-center">Login</Text>
      </Pressable>

      {/* Signup Button */}
      <Pressable 
        className="w-64 p-4 bg-white rounded-full border border-gray-400"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text className="text-black text-lg text-center">Sign Up</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen