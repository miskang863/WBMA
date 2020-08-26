/* eslint-disable object-curly-spacing */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={{ uri: props.singleMedia.thumbnails.w160 }}
        />
      </View>

      <View style={styles.text}>
        <Text style={styles.title}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    borderRadius: 10,
  },
  cats: {
    padding: 10,
    backgroundColor: 'grey',
    flexDirection: 'row',
  },
  view: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  image2: {
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  text: {
    flex: 1,
    padding: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
