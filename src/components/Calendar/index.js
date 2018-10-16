import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, TextInput, Platform, Keyboard
} from 'react-native';
import {Button} from "native-base";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const isAndroid = Platform.OS === "android";
const viewPadding = 0;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedNote: "",
            text: "",
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    static navigationOptions = {
        title: 'Calendar'
    };


    componentDidMount() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const prevDate = await AsyncStorage.getItem("@SuperKey");
            if (prevDate !== null) {
                this.setState({selectedStartDate: prevDate});
            }
        } catch (error) {
        }
    }

    componentWillUnmount() {
        this._saveData();
    }

    _saveData = () => {
        AsyncStorage.setItem("@SuperKey", this.state.selectedStartDate.toString());
    };

    _save = () => {
        AsyncStorage.setItem(this.state.selectedStartDate.toString(), this.state.selectedNote);
    }

    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
            text: "",
        });
    }

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addNote = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                {selectedNote: this.state.text}
            );
            this._save();
        }
    };

    render() {
        const { selectedStartDate, selectedNote } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>
                <CalendarList
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    style={{marginLeft: 5, marginRight: 5, marginTop: 5, height: "100%"}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
    },
    smallContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"

    },
    buttonColumn: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    textInput: {
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: "#F2F2F2",
        borderWidth: isAndroid ? 0 : 2,
        width: "100%",
        borderRadius: 15,
        backgroundColor: "white",
        fontSize: 18,

    },
    textContainer: {
        backgroundColor: "#EAEAEA",
        width: "100%",
        padding: 10,
    },
});