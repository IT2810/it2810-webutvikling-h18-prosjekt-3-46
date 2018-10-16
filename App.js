import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import TodoList from './src/components/TodoList';
import DailyProgress from './src/components/DailyProgress';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Main'
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
              onPress={() => this.props.navigation.navigate('DailyProgress')}
          />
      </View>
    );
  }
}
/*
export default createBottomTabNavigator({
        Home: {
            screen: HomeScreen
        },
        "Tasks": {
            screen: createStackNavigator({TodoList: {screen: TodoList}}),
            navigationOptions: () => ({
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        name="ios-list-box"
                        type="Ionicons"
                        color={tintColor}
                        size={10}
                    />
                )
            }),
            tabBarOptions: {
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }
        },
        "Daily Progress": {
            screen: createStackNavigator({DailyProgress: {screen: DailyProgress}})
        }
    },
    {
        tabBarOptions: {
                activeTintColor: '#F8F8F8', // active icon color
                inactiveTintColor: '#586589',  // inactive icon color
                style: {
                backgroundColor: '#FFF' // TabBar background
            }
        }
    },
    {
        portraitOnlyMode: true
    });*/

export default createBottomTabNavigator(
    {
        Home: HomeScreen,
        "Tasks": createStackNavigator({TodoList: {screen: TodoList}}),
        "Daily Progress": createStackNavigator({DailyProgress: {screen: DailyProgress}})
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let type;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    type="Ionicons";
                } else if (routeName === 'Tasks') {
                    iconName = `ios-list${focused ? '-box' : ''}`;
                    type="Ionicons";
                } else if (routeName === 'Daily Progress') {
                    iconName = `heart${focused ? 'beat' :  '-o'}`;
                    type = "FontAwesome";
                }
                return <Icon type={type} name={iconName} size={25} color={tintColor} style={{marginTop: 2, marginBottom: 2}} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#007aff',
            inactiveTintColor: 'gray',
        },
    },
    {
        portraitOnlyMode: true
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
      width: "100%"
  },
});

