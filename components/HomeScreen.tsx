import { Pressable, View, Text, Image } from 'react-native'
import React from 'react'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/constants/Nav'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 justify-between items-center">
      <View className="items-center mt-20">
        <Image
          source={require('@/assets/images/Logo.png')}
          className="w-20 h-20"
          resizeMode="contain" 
        />
        <Text className="text-2xl font-bold mt-2 tracking-wide">RUNI</Text>
      </View>

      <View className="items-center w-5/6 mb-10">
        <Pressable
          className="bg-blue-400 p-3 rounded-lg items-center w-full mb-5"
          onPress={() => navigation.navigate("Signup")}
        >
          <Text className="text-lg font-bold text-white">Join Runi</Text>
        </Pressable>
        <Pressable 
          className="items-center w-full"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-lg font-bold">Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HomeScreen