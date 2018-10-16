import React from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import TodoList from './src/components/TodoList';
import Calendar from './src/components/Calendar';
import DailyProgress from './src/components/DailyProgress';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Main'
    };

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
          <Button
              title="Go to Calendar"
              onPress={() => this.props.navigation.navigate('Calendar')}
          />
      </View>
    );
  }

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

