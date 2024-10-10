import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrowleft"
            size={28}
          />
        </TouchableOpacity>
        <Text>Welcome{'\n'}Back</Text>
      </View>
      <View>
        <TextInput
          className=""
        />
        <TextInput />
      </View>
    </View>
  )
}

export default LoginScreen