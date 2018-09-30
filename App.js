import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class App extends React.Component {
  render() {
    let pic = {
      uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/42494556_472859826547938_6997339089187897344_n.jpg?_nc_cat=1&oh=fa4282e2300d5a707c6ec842e7240204&oe=5C1CA81C'
    };

    return (
      <View style={styles.container}>
        <Text>We are started boys</Text>
        <Image source={pic} style={{width: 300, height: 400}}/>
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
