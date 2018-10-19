import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { Button, Icon} from 'native-base';
import Modal from "react-native-modal";

/* Agendascreen. Provides as a calendar where the days in the calendar has corresponding notes.
   You can both add, edit and delete the notes as you please. */
export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Dates with corresponding notes
            items: {},
            // The currently selected date. Default: today
            selectedDate: this.timeToString(new Date()),
            // Toggles visibility of the modal
            visibleModal: false,
            // Currently selected note
            currentText: "",
        };
    }


    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            title: 'Calendar',
            headerRight: (
                <Button transparent onPress={params.toggleModal}>
                    <Icon name="pencil" type={"FontAwesome"}/>
                </Button>
            )
        };
    };

    componentWillMount() {
        if (this.props.navigation === undefined) {
        } else {
            this.props.navigation.setParams({toggleModal: this._toggleModal});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Modal
                        // Makes the modal appear and disappear
                        isVisible={this.state.visibleModal}
                        // Style applied to the modal
                        style={styles.modalContent}>
                        <TouchableWithoutFeedback
                            // Makes the keyboard disappear when a press is registered outside of the keyboard
                            onPress={Keyboard.dismiss}
                            accessible={false}>
                            <View style={styles.smallContainer}>
                                <Text style={{fontSize: 30, fontWeight: "bold", letterSpacing: 3}}>{this.getParsedDate(this.state.selectedDate)}</Text>
                                <Text style={{marginTop: 30}}>Edit a note for this day:</Text>
                                <View style={styles.textContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        multiline={true}
                                        keyboardType = 'default'
                                        returnKeyType="done"
                                        returnKeyLabel="done"
                                        placeholder={"What are your plans?"}
                                        /* If this day has no corresponding note => no value
                                           If this day has a corresponding note => the value is set to this note */
                                        value={ this.state.items[this.state.selectedDate] === undefined ||
                                                this.state.items[this.state.selectedDate].length === 0 ?
                                                '' : this.itemData(this.state.items[this.state.selectedDate])
                                        }
                                        onChangeText={(text) => this.setState({currentText: text})}
                                    />
                                </View>
                                <Button block success onPress={() => this.addText(false)} style={{marginTop: 20}}>
                                    <Text style={{color: "white"}}>Add Note</Text>
                                </Button>
                                <Button block danger onPress={() => this.addText(true)} style={{marginTop: 20}}>
                                    <Text style={{color: "white"}}>Remove Note</Text>
                                </Button>
                                <Button block onPress={this._toggleModal} style={{marginTop: 20}}>
                                    <Text style={{color: "white"}}>Close</Text>
                                </Button>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>

                <Agenda
                    /* The list of items that have to be displayed in agenda. If you want to render item as empty date
                       the value of date key kas to be an empty array []. If there exists no value for date key it is
                       considered that the date in question is not yet loaded */
                    items={this.state.items}
                    // callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={this.loadItems.bind(this)}
                    // specify how each item should be rendered in agenda
                    renderItem={this.renderItem.bind(this)}
                    // specify how empty date content with no items should be rendered
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    // specify your item comparison function for increased performance
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // callback that gets called on day press
                    onDayPress={(day) => {this.selectDate(day)}}
                    // callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day) => {this.selectDate(day)}}
                    // agenda themes
                    theme={{
                        agendaTodayColor: '#007aff',
                        selectedDayBackgroundColor: '#007aff',
                        dotColor: '#007aff',
                        todayTextColor: '#007aff',
                    }}
                />
            </View>
        );
    }

    getParsedDate(date){
        let dateArray = String(date).split('-');
        return parseInt(dateArray[2]) + "." + parseInt(dateArray[1]) + "." + parseInt(dateArray[0]);
    }

    // Renders a predefined amount of dates with corresponding texts/notes.
    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 50; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    this._retrieveData(strTime);
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    // Renders one date with corresponding text/note
    loadItem(stringDate) {
        setTimeout(() => {
                if (!this.state.items[stringDate]) {
                    this.state.items[stringDate] = [];
                    this._retrieveData(stringDate);
                }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    // Every non-empty note gets represented as a simple Text-component.
    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    // Every empty note gets representet as a Text-component with the text "Ingen avtaler"
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Ingen avtaler</Text></View>
        );
    }

    // Checks if row has changed
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    // Converts a dateobjekt to a string
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    // Returns the text/note for a given day
    itemData(item) {
        if(item === undefined) {
            return "Ingen avtaler";
        }
        if(item.length === 0) {
            return "Ingen avtaler";
        }
        return item[0].name;
    }

    // Updates currently selected date and corresponding text/note
    selectDate(day) {
        this.setState({selectedDate: day.dateString,
                        currentText: this.itemData(this.state.items[this.state.selectedDate])
        });
    }

    // Toggles visibility of the modal-component
    _toggleModal = () => {
        let temp = this.state.visibleModal;
        this.setState({visibleModal: !temp});
    };

    // Handles the adding and deletion of a text/note for a given day
    addText(deleteText) {
        this._toggleModal();
        if(this.state.currentText !== "" && deleteText === false) {
            this._saveData(this.state.selectedDate, this.state.currentText);
        } else {
            AsyncStorage.removeItem(this.state.selectedDate);
        }
        this._retrieveData(this.state.selectedDate);
        this.loadItem(this.state.selectedDate);
    }

    // Retrieves previously asynchronously stored data
    _retrieveData = async (dateKey) => {
        try {
            const note = await AsyncStorage.getItem(dateKey);
            this.state.items[dateKey] = [];
            if (note !== null) {
                this.state.items[dateKey].push({
                    name: note,
                    height: Math.max(50, Math.floor(Math.random() * 150))
                });
            }
        } catch (error) {
        }
    }

    // Saves the data asynchronously
    _saveData = (dateKey, note) => {
        AsyncStorage.removeItem(dateKey);
        AsyncStorage.setItem(dateKey, note);
    };

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
    container: {
        flex: 1,
        width: "100%"

    },
    smallContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        width: "100%"
    },
    textContainer: {
        backgroundColor: "white",
        padding: 10,
        width: "100%"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        width: "90%"
    },
    textInput: {
        height: 150,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
        borderColor: "#F2F2F2",
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: "white",
        fontSize: 18
    },
});