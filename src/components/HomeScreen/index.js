import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, StatusBar} from 'react-native';
import { Icon } from 'native-base';

export default class HomeScreen extends React.Component {
   constructor() {
       super();
       this.state = {

           // List of inspirational quotes
           quotes: [
               "Don't judge each day by the harvest you reap but by the seeds that you plant. ",
               "Whatever you are, be a good one.",
               "Don’t wait. The time will never be just right.",
               "Do what you can, with what you have, where you are.",
               "Being glamorous is about strength and confidence. It's black and white - dramatic. You have to be strong.",
               "If you dream it, you can do it.",
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
           displayText: "You must be the change you wish to see in the world.",
           curTime: new Date()
       };
   };

   // React Navigation configuration
   static navigationOptions = {
       title: 'Home'
   };


   // LIFECYCLE METHODS


   // Changes the color of the status bar to fit with the displayed content
    componentDidMount() {
        if (this.props.navigation === undefined) {

        } else {
            this._navListener = this.props.navigation.addListener('didFocus', () => {
                StatusBar.setBarStyle('light-content');
            });
            setInterval( () => {
                this.setState({
                    curTime : new Date()
                })
            },10000);
        }
    }

    componentWillUnmount() {
        this._navListener.remove();
    }


   render() {
       return (
           <View style={styles.container}>
               <StatusBar barStyle="light-content" />
               <ImageBackground
                   source={require('../../assets/background.jpg')}
                   imageStyle={{resizeMode: 'stretch'}}
                   style={styles.image}>
                   <View style={{padding:20, marginBottom: 70, marginTop: 40, width: "90%", flex: 1}}>
                       <Text style={[styles.paragraph, styles.day]}>{this.getDate()[0]}</Text>
                       <Text style={[styles.paragraph, styles.clock]}>{this.getDate()[1]}</Text>

                   </View>
                   <TouchableOpacity onPress={this.toggleNewQuote} style={{marginBottom: 70, height: "50%", justifyContent: "center"}}>
                       <View style={{backgroundColor:'rgba(0, 0, 0, 0.75)', padding:20, borderRadius: 15, width: "90%"}}>
                           <Text style={[styles.paragraph, {opacity: 0.95}]}>
                               “{this.state.displayText}”
                           </Text>
                           <Icon type="MaterialCommunityIcons" name="gesture-tap" style={{
                               position: 'absolute',
                               color: "white",
                               fontSize: 28,
                               opacity: 0.85,
                               right: 4,
                               bottom: 4
                           }} />
                       </View>
                   </TouchableOpacity>
               </ImageBackground>
           </View>
       );
       
   }


    // Toggle the random selection of a new "Quote of the Day" to be displayed
    toggleNewQuote = () => {
        var rand = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)];
         if (rand===this.state.displayText) {
             this.toggleNewQuote();
         } else {
             this.setState({displayText: rand});
         }
    };

    // Get the current date and format into a String. Returns an array of strings where index 0 is the current Date,
    // and index 1 is the current time
    getDate() {
        let date = this.state.curTime;
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return [days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate(),
                (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" +
                (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()];
   }
}


// Stylesheet
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
        opacity: 0.9
     
    },
    clock: {
        fontSize: 70,
        letterSpacing: 1
    },
    day: {
        fontSize: 40,
        marginBottom: 5
    }
 });