/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

const Upload = ({ navigation }) => {
  return (
    <Container>
      <Content padder></Content>
    </Container>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
