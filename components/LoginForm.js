/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { postLogin } from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginFrom from '../hooks/LoginHooks';
import { Form, Button, Text } from 'native-base';

const LoginForm = ({ navigation }) => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      console.log('user login success: ', userData);
      setUser(userData.user);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('login error: ' + e.message);
    }
    // navigation.navigate('Home');
  };

  const { handleInputChange, inputs } = useLoginFrom();

  return (
    <Form>
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
      <Button block onPress={doLogin}>
        <Text>Login!</Text>
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
