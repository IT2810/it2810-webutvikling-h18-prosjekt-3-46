import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import TodoList from './src/components/TodoList';
import Calendar from './src/components/Calendar';
import DailyProgress from './src/components/DailyProgress';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";

class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            quotes: [
                "Don't judge each day by the harvest you reap but by the seeds that you plant. ",
                "Write it on your heart that every day is the best day in the year. ",
                "Every moment is a fresh beginning.",
                "Everything you’ve ever wanted is on the other side of fear. ",
                "Begin at the beginning… and go on till you come to the end: then stop.",
                "Make each day your masterpiece.",
                "You cannot tailor-make the situations in life but you can tailor-make the attitudes to fit those situations.",
                "The day is what you make it! So why not make it a great one?",
                "To be the best, you must be able to handle the worst.",
                "Believe and act as if it were impossible to fail.",
                "You must be the change you wish to see in the world.",
                "The greatest discovery of all time is that a person can change his future by merely changing his attitude."
            ],
            displayText: "You must be the change you wish to see in the world."
        };
    };

    static navigationOptions = {
        title: 'Home'
    };


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('./src/assets/background.jpg')}
                    imageStyle={{resizeMode: 'stretch'}}
                    style={styles.image}>
                    <TouchableOpacity onPress={this.toggleNewQuote}>
                        <View style={{backgroundColor:'rgba(0, 0, 0, 0.65)', padding:20, borderRadius: 15, width: "90%"}}>
                            <Text style={styles.paragraph}>
                                {this.state.displayText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
        
    }

    toggleNewQuote = () => {
        var rand = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
        if (rand===this.state.displayText) {
            this.toggleNewQuote
        } else {
            this.setState({displayText: rand});
        }
    }
}

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
                    iconName = `calendar${focused ? '' : '-o'}`;
                    type="FontAwesome";
                } else if (routeName === 'Tasks') {
                    iconName = `ios-list${focused ? '-box' : ''}`;
                    type="Ionicons";
                } else if (routeName === 'Daily Progress') {
                    iconName = `heart${focused ? 'beat' :  '-o'}`;
                    type = "FontAwesome";
                }
                return <Icon type={type} name={iconName} color={tintColor} style={{marginTop: 3, marginBottom: 1,fontSize: 28 }} />;
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