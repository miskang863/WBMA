import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Form, Spinner, Text } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import { Image, Platform } from 'react-native';
import useUploadForm from '../hooks/UploadHooks';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';
import { upload, appIdentifier, postTag } from '../hooks/APIhooks';
import { Video } from 'expo-av';

const Upload = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('image');

  const { handleInputChange, uploadErrors, inputs, reset } = useUploadForm();

  const doUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') {
        type = 'image/jpeg';
      }
      formData.append('file', { uri: image, name: filename, type });
      const userToken = await AsyncStorage.getItem('userToken');
      const resp = await upload(formData, userToken);
      console.log('upload', resp);

      const postTagResponse = await postTag(
        {
          file_id: resp.file_id,
          tag: appIdentifier,
        },
        userToken
      );
      console.log('Posting  tag:', postTagResponse);

      // wait 2s
      setTimeout(() => {
        doReset();
        navigation.push('Home');
      }, 2000);
    } catch (e) {
      console.log('upload error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setFileType(result.type);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const doReset = () => {
    reset();
    setImage(null);
    console.log(inputs);
  };

  return (
    <Container>
      <Content padder>
        {image && (
          <>
            {fileType === 'image' ? (
              <Image
                source={{ uri: image }}
                style={{ width: null, height: 200, flex: 1 }}
              />
            ) : (
              <Video
                source={{ uri: image }}
                style={{ width: null, height: 200, flex: 1 }}
                useNativeControls={true}
              />
            )}
          </>
        )}
        <Form>
          <FormTextInput
            autoCapitalize="none"
            placeholder="title"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="description"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}
          />
        </Form>
        <Button block onPress={pickImage}>
          <Text>Choose file</Text>
        </Button>
        {isLoading && <Spinner />}
        <Button
          block
          disabled={
            uploadErrors.title !== null ||
            uploadErrors.description !== null ||
            image === null
          }
          onPress={doUpload}
        >
          <Text>Upload</Text>
        </Button>

        <Button block onPress={doReset}>
          <Text>RESET</Text>
        </Button>
      </Content>
    </Container>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
