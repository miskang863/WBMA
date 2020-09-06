/* eslint-disable object-curly-spacing */
import React, { useContext } from 'react';
import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const Profile = (navigation) => {
  const { setIsLoggedIn, user } = useContext(AuthContext);
  console.log('logged in user data: ', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text>Username: {user.username}</Text>
      <Text>E-mail: {user.email}</Text>
      <Text>Full name: {user.full_name}</Text>
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
