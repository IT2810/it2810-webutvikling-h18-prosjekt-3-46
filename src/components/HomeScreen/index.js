import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';

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