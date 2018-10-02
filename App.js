import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class App extends React.Component {
  render() {
    

    return (
      <View style={styles.container}>
        <Text>We are started boys</Text>
        <Image source={require('./src/assets/smund.png')} style={{width: 300, height: 400}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
