/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { postLogin } from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginFrom from '../hooks/LoginHooks';

const LoginForm = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('user login success: ', userData);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('login error: ' + e.message);
    }
    // navigation.navigate('Home');
  };

  const { handleInputChange, inputs } = useLoginFrom();

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
      <Button title="Login!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
