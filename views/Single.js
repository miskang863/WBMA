import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({ route }) => {
  const { file } = route.params;
  return (
    <View style={styles.container}>
      <Text>Title: {file.title}</Text>
      <Image
        style={styles.image}
        source={{ uri: mediaUrl + file.filename }}
      ></Image>
      <Text>Description: {file.description}</Text>
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
    height: 300,
    width: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
