/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({ navigation }) => {
  // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  console.log('Login: ', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === 'abc') {
      setIsLoggedIn(true);
      navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const logIn = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', 'abc');
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
