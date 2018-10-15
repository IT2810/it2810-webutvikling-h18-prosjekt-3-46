import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import TodoList from './src/components/TodoList';
import Pedometer from './src/components/Pedometer';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Current Progression'
    };
  render() {
    

    return (
      <View style={styles.container}>
        <Text>We ar
            e started boys</Text>
        <Image source={require('./src/assets/smund.png')} style={{width: 300, height: 400}}/>
          <Button
              title="Go to ToDo"
              onPress={() => this.props.navigation.navigate('ToDo')}
          />
          <Button
              title="Go to Goals"
              onPress={() => this.props.navigation.navigate('Goals')}
          />
      </View>
    );
  }
}

export default createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    ToDo: {
        screen: TodoList
    },
    Goals: {
        screen: Pedometer
    }
},
    {
        portraitOnlyMode: true
    });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
      width: "100%"
  },
});
