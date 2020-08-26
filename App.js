/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List></List>
    </SafeAreaView>
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
});

export default App;
