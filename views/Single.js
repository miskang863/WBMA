/* eslint-disable object-curly-spacing */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Left,
  Icon,
  Title,
  Text,
  Content,
  Container,
} from 'native-base';
import { Video } from 'expo-av';
import { getUser } from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({ route }) => {
  const [error, setError] = useState(false);
  const [owner, setOwner] = useState({});
  const [videoRef, setVideoRef] = useState(null);
  const { file } = route.params;

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.presentFullscreenPlayer();
    } catch (e) {
      console.log('svifs error', e.message);
    }
  };

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
  };

  const lock = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  const fetchUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    const userInfo = await getUser(file.user_id, userToken);
    setOwner(userInfo);
  };

  useEffect(() => {
    unlock();
    fetchUser();
    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        showVideoInFullscreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListeners(orientSub);
      lock();
    };
  }, []);
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem>
            <Left>
              <Icon name={'image'} />
              <Title>{file.title}</Title>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {file.media_type === 'image' ? (
              <Image
                source={{ uri: mediaUrl + file.filename }}
                style={{ height: 400, width: null, flex: 1 }}
              />
            ) : (
              <Video
                ref={handleVideoRef}
                source={{
                  uri:
                    'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                style={{ height: 400, width: null, flex: 1 }}
                useNativeControls={true}
                resizeMode="cover"
                // posterSource={{ uri: mediaUrl + file.screenshot }}
                // posterStyle={{ height: 400, width: null, flex: 1 }}
                // usePoster={true}
                onError={(err) => {
                  setError(true);
                  console.log('vide error', err);
                }}
              />
            )}
          </CardItem>
          <CardItem>
            <Text>{file.description}</Text>
          </CardItem>
          <CardItem>
            <Text>Username: {owner.username}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
