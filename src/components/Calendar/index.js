import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage, TextInput, Platform, Keyboard
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {Button} from "native-base";

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
                <CalendarPicker
                    onDateChange={this.onDateChange}
                />

                <View>
                    <Text>SELECTED DATE: { startDate }</Text>
                </View>
                <View>
                    <Text>SELECTED NOTE: { selectedNote }</Text>
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.changeTextHandler}
                        onSubmitEditing={this.addNote}
                        value={this.state.text}
                        placeholder="Add a note"
                        returnKeyType="done"
                        returnKeyLabel="done"
                    />
                </View>
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