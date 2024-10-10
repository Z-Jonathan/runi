import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrowleft"
          size={28}
        />
      </TouchableOpacity>
      <Text>SignupScreen</Text>
    </View>
  )
}

export default SignupScreen