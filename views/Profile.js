/* eslint-disable object-curly-spacing */
import React, { useContext } from 'react';
import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const Profile = (navigation) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
  console.log('profile', isLoggedIn);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
