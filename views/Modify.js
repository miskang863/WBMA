import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Content, Form, Spinner, Text } from 'native-base';
import FormTextInput from '../components/FormTextInput';
import { Image } from 'react-native';
import useUploadForm from '../hooks/UploadHooks';
import AsyncStorage from '@react-native-community/async-storage';
import { Video } from 'expo-av';
import { updateFile } from '../hooks/APIhooks';

const Modify = ({ navigation, route }) => {
  const { file } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const doModify = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      await updateFile(file.file_id, inputs, userToken);
      console.log('update fileinfo', result);
    } catch (e) {
      console.log('update error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    handleInputChange,
    uploadErrors,
    inputs,
    reset,
    setInputs,
  } = useUploadForm();

  useEffect(() => {
    setInputs({
      title: file.title,
      description: file.description,
    });
  }, []);

  const doReset = () => {
    reset();
    // console.log(inputs);
  };

  return (
    <Container>
      <Content padder>
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

        {isLoading && <Spinner />}
        <Button
          block
          disabled={
            uploadErrors.title !== null || uploadErrors.description !== null
          }
          onPress={doModify}
        >
          <Text>Save</Text>
        </Button>
        <Button block onPress={doReset}>
          <Text>RESET</Text>
        </Button>
      </Content>
    </Container>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
