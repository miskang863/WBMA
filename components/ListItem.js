/* eslint-disable object-curly-spacing */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.cats}>
      <View style={styles.catCard}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cats: {
    padding: 10,
    flex: 1,
  },
  catCard: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
  },
  view: {
    flex: 1,
    paddingLeft: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
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

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
