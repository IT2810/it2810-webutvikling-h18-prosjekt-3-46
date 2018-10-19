import React from 'react';
import { StyleSheet } from 'react-native';
import TodoList from './src/screens/TodoList';
import Calendar from './src/screens/Calendar';
import DailyProgress from './src/screens/DailyProgress';
import HomeScreen from './src/screens/HomeScreen';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";


// Navigation configuration. Our implementation uses React Navigation with a TabNavigator, where
// we have nested a StackNavigator inside some of the screens, in order to get access to both a header and
// Tab-bar on the bottom
export default createBottomTabNavigator(
    {
        Home: HomeScreen,
        "Calendar": createStackNavigator({Calendar: {screen: Calendar}}),
        "Tasks": createStackNavigator({TodoList: {screen: TodoList}}),
        "Daily Progress": createStackNavigator({DailyProgress: {screen: DailyProgress}})

    },
    {
        // Set icon color and version depending on whether the tab is currently focused or not
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let type;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    type="Ionicons";
                } else if (routeName === 'Calendar') {
                    iconName = `ios-calendar${focused ? '' : ''}`;
                    type="Ionicons";
                } else if (routeName === 'Tasks') {
                    iconName = `ios-list${focused ? '' : ''}`;
                    type="Ionicons";
                } else if (routeName === 'Daily Progress') {
                    iconName = `ios-body${focused ? '' :  ''}`;
                    type = "Ionicons";
                }
                return <Icon type={type} name={iconName} color={tintColor} style={{marginTop: 3, marginBottom: 1, fontSize: 28, color: `${focused ? '#007aff' : 'gray' }`}} />;
            },
        }),
        tabBarOptions: {
            // Blue for focused tab, gray otherwise
            activeTintColor: '#007aff',
            inactiveTintColor: 'gray',
        },
    },
    {
        portraitOnlyMode: true
    }
);


// StyleSheet
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    image: {
      flexGrow:1,
      height:'100%',
      width:null,
      alignItems: 'center',
      justifyContent:'center',
    },
    paragraph: {
      textAlign: 'center',
      color: 'white',
      fontSize: 30,
      
    },
  });