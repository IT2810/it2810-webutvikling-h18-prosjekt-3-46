import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    TextInput
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { Container, Header, Content, Button, Icon} from 'native-base';
import Modal from "react-native-modal";

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            selectedDate: this.timeToString(new Date()),
            visibleModal: false,
        };
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            title: 'Calendar',
            headerRight: (
                <Button transparent onPress={params.toggleModal}>
                    <Icon name="add-circle" type={"Ionicons"}/>
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
                        <View style={styles.smallContainer}>

                            <Text style={{marginTop:20}}>Edit a note for this day: {this.state.selectedDate}</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType = 'default'
                                    returnKeyType="done"
                                    returnKeyLabel="done"
                                    value={(JSON.stringify(this.state.items[this.state.selectedDate]))}

                                />
                            </View>
                            <Button block onPress={this._toggleModal} style={{marginTop: 20}}>
                                <Text style={{color: "white"}}>Close</Text>
                            </Button>
                        </View>
                    </Modal>
                </View>

                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    onDayPress={(day) => {this.selectDate(day)}}
                    onDaychange={(day) => {this.selectDate(day)}}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    //theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            </View>
        );
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
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
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

    selectDate(day) {
        const time = day.timestamp;
        const strTime = this.timeToString(time);
        this.setState({selectedDate: strTime});
    }

    _toggleModal = () => {
        let temp = this.state.visibleModal;
        this.setState({visibleModal: !temp});
    };

    _retrieveData = async (dateKey) => {
        try {
            const note = await AsyncStorage.getItem(dateKey);
            if (note !== null) {
                this.state.items[dateKey].push({
                    name: 'Item = ' + note,
                    height: Math.max(50, Math.floor(Math.random() * 150))
                });
            }
        } catch (error) {
        }
    }

    _saveData = (dateKey, note) => {
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
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: "#F2F2F2",
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: "white",
        fontSize: 18
    },
});