/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
// import { postLogin } from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import { postRegistration, postLogin } from '../hooks/APIhooks';

const RegisterForm = ({ navigation }) => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const doRegister = async () => {
    try {
      const result = await postRegistration(inputs);
      console.log('register success: ', result);
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData);
    } catch (e) {
      console.log('registeration error: ' + e.message);
    }
  };
  const { inputs, handleInputChange } = useSignUpForm();
  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
