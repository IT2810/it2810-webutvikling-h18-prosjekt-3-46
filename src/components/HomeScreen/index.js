import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {
   constructor() {
       super()
       this.state = {
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
           currentDay: "12:04",
           firstLoad: true,
       };
   };

   static navigationOptions = {
       title: 'Home'
   };

   render() {
       return (
           <View style={styles.container}>
               <ImageBackground
                   source={require('../../assets/background.jpg')}
                   imageStyle={{resizeMode: 'stretch'}}
                   style={styles.image}>
                   <View style={{padding:20, marginBottom: 70, marginTop: 40, width: "90%", flex: 1}}>
                        <Text style={[styles.paragraph, {fontSize: 60, letterSpacing: 4}]}>{this.getDate()}</Text>
                   </View>
                   <TouchableOpacity onPress={this.toggleNewQuote} style={{marginBottom: 100, height: "50%", justifyContent: "center"}}>
                       <View style={{backgroundColor:'rgba(0, 0, 0, 0.65)', padding:20, borderRadius: 15, width: "90%"}}>
                           <Text style={styles.paragraph}>
                               “{this.state.displayText}”
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
   };

    getDate() {
            if (this.state.firstLoad === true) {
                this.setState({firstLoad: false});
                return this.state.currentDay;
            } else {
                let date = new Date();
            return (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            }
   }
}



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