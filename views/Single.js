import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({ route }) => {
  const { file } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {file.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: mediaUrl + file.filename }}
      ></Image>
      <Text style={styles.text}>Description: {file.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },

  image: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  title: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 15,
    fontFamily: 'serif',
  },
  text: {
    flex: 2,
    padding: 10,
    fontFamily: 'serif',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
