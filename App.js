import React from 'react';
import { StyleSheet } from 'react-native';
import TodoList from './src/components/TodoList';
import Calendar from './src/components/Calendar';
import DailyProgress from './src/components/DailyProgress';
import HomeScreen from './src/components/HomeScreen';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";



export default createBottomTabNavigator(
    {
        Home: HomeScreen,
        "Calendar": createStackNavigator({Calendar: {screen: Calendar}}),
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