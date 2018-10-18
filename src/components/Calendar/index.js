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

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            selectedDate: this.timeToString(new Date()),
            visibleModal: false,
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
        this.props.navigation.setParams({toggleModal: this._toggleModal});
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Modal isVisible={this.state.visibleModal} style={styles.modalContent}>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    onDayPress={(day) => {this.selectDate(day)}}
                    onDayChange={(day) => {this.selectDate(day)}}
                />
            </View>
        );
    }

    getParsedDate(date){
        var dateArray = String(date).split('-');
        return parseInt(dateArray[2]) + "." + parseInt(dateArray[1]) + "." + parseInt(dateArray[0]);
    }

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

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Ingen avtaler</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    itemData(item) {
        if(item === undefined) {
            return "Ingen avtaler";
        }
        if(item.length === 0) {
            return "Ingen avtaler";
        }
        return item[0].name;
    }

    selectDate(day) {
        this.setState({selectedDate: day.dateString,
                        currentText: this.itemData(this.state.items[this.state.selectedDate])
        });
    }

    _toggleModal = () => {
        let temp = this.state.visibleModal;
        this.setState({visibleModal: !temp});
    };

    addText(deleteText) {
        this._toggleModal();
        if(this.state.currentText !== "" && deleteText === false) {
            this._saveData(this.state.selectedDate, this.state.currentText);
        } else {
            AsyncStorage.removeItem(this.state.selectedDate);
            console.log("removed");
        }
        this._retrieveData(this.state.selectedDate);
        this.loadItem(this.state.selectedDate);
    }

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