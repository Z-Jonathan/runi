import { View, Text, Image } from 'react-native'
import React from 'react'


const App = () => {
  return (
    <View className="flex flex-row items-center">
        <Image
        source={require('@/assets/images/Logo.png')}
        className=""
        />
        <Text className="text-xl">App</Text>
    </View>
  )
}

export default App