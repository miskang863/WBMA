/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import List from '../components/List';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';

const Home = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgreen" />

      <View style={styles.topImage}>
        <Image
          style={styles.mainImage}
          source={{
            uri:
              'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          }}
        />

        <View style={styles.textView}>
          <Text style={styles.text}>Kisumirri</Text>
        </View>
      </View>
      <List navigation={navigation} style={styles.list}></List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 30,
    flex: 1,
  },
  mainImage: {
    width: 400,
    height: 200,
  },
  topImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: 'lightgreen',
  },
  textView: {
    position: 'absolute',
    left: 0,
    top: 50,
    backgroundColor: 'rgba(105,105,105, 0.3)',
  },
  text: { padding: 3, paddingLeft: 6, fontFamily: 'serif' },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
