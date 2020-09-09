/* eslint-disable object-curly-spacing */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import {
  ListItem as NBListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Icon,
} from 'native-base';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({ navigation, singleMedia }) => {
  return (
    <NBListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
        />
      </Left>
      <Body>
        <Text>{singleMedia.title}</Text>
        <Text note numberOfLines={1}>
          {singleMedia.description}
        </Text>
      </Body>
      <Right>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Single', {
              file: singleMedia,
            });
          }}
        >
          <Icon name={'eye'}></Icon>
          <Text>View</Text>
        </Button>
      </Right>
    </NBListItem>
    // <TouchableOpacity
    //   style={styles.cats}
    //   onPress={() => {
    //     navigation.navigate('Single', {
    //       file: singleMedia,
    //     });
    //   }}
    // >
    //   <View style={styles.catCard}>
    //     <View style={styles.view}>
    //       <Image
    //         style={styles.image}
    //         source={{ uri: mediaUrl + singleMedia.thumbnails.w160 }}
    //       />
    //     </View>

    //     <View style={styles.text}>
    //       <Text style={styles.title}>{singleMedia.title}</Text>
    //       <Text>{singleMedia.description}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
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
  navigation: PropTypes.object,
};

export default ListItem;
