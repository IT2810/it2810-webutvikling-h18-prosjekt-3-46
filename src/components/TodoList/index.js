import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    TextInput,
    Keyboard,
    Platform,
    TouchableOpacity,
    StatusBar,
    Alert
} from "react-native";
import Swipeout from 'react-native-swipeout';
import Toast, {DURATION} from 'react-native-easy-toast'
import {Button, Icon} from "native-base";

const isAndroid = Platform.OS === "android";
const viewPadding = 0;

export default class TodoList extends Component {

    constructor(props) {
        super(props);

        // Avoid async tasks being run after component is unmounted:
        this._isMounted = false;
    }

    state = {
        tasks: [],
        text: ""
    };

    static navigationOptions = {
        title: 'Tasks',
        headerRight: (
            <Button transparent onPress={() => Alert.alert("Info", "Swipe left on a task in order to remove it.")}>
                <Icon name="ios-information-circle-outline" type="Ionicons"/>
            </Button>
        )
    };

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    addTask = () => {
        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            this.setState(
                prevState => {
                    let { tasks, text } = prevState;
                    return {
                        tasks: tasks.concat({ key: tasks.length, text: text }),
                        text: ""
                    };
                },
                () => Tasks.save(this.state.tasks)
            );
        }
    };

    deleteTask = i => {
        this.setState(
            prevState => {
                let tasks = prevState.tasks.slice();

                tasks.splice(i, 1);

                return { tasks: tasks };
            },
            () => Tasks.save(this.state.tasks)
        );
        this.refs.toast.show('Good job!', 2000);
    };

    componentDidMount() {
        this._isMounted = true;
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            e => this._isMounted && this.setState({ viewPadding: e.endCoordinates.height + viewPadding - 50})
        );

        Keyboard.addListener(
            isAndroid ? "keyboardDidHide" : "keyboardWillHide",
            () => this._isMounted && this.setState({ viewPadding: viewPadding })
        );

        Tasks.all(tasks => this._isMounted && this.setState({ tasks: tasks || [] }));

        // Changes the color of the status bar to fit with the displayed content
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('default');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
        this._isMounted = false;
    }

    renderTask(item, index) {
        let swipeoutBtns = [
            {
                text: "Done",
                backgroundColor: "#5cb85c",
                onPress: () => {
                    this.deleteTask(index)
                }
            }
        ];
        return(
            <View>
                <View style={styles.listItemCont}>
                    <Swipeout right={swipeoutBtns}
                              autoClose={true}
                              style={styles.listSwipe}
                    >
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.listItem}>
                                    {item.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Swipeout>
                </View>
                <View style={styles.hr} />
            </View>
        )
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
                <FlatList
                    keyExtractor = { (item, index) => index.toString() }
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item, index }) => this.renderTask(item, index)}
                />
                <View>
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.changeTextHandler}
                        onSubmitEditing={this.addTask}
                        value={this.state.text}
                        placeholder="Add Tasks"
                        returnKeyType="done"
                        returnKeyLabel="done"
                        underlineColorAndroid='transparent'
                    />
                </View>
                <Toast ref="toast"
                       style={{backgroundColor:"#5cb85c"}}
                       position='center'
                       fadeInDuration={400}
                       fadeOutDuration={900}
                       opacity={1}
                       textStyle={{color:'white', fontSize: 18, padding: 7,
                           paddingLeft: 19, paddingRight: 19}}
                />
            </View>
        );
    }

}

let Tasks = {
    convertToArrayOfObject(tasks, callback) {
        return callback(
            tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
        );
    },
    convertToStringWithSeparators(tasks) {
        return tasks.map(task => task.text).join("||");
    },
    all(callback) {
        return AsyncStorage.getItem("TASKS", (err, tasks) =>
            this.convertToArrayOfObject(tasks, callback)
        );
    },
    save(tasks) {
        AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        padding: viewPadding,
        paddingTop: 0,
        width: "100%"
    },
    list: {
        width: "100%"
    },
    listItem: {
        padding: 15,
        fontSize: 18,
        paddingTop: 30,
        paddingBottom: 30,
        width: "100%"

    },
    listSwipe: {
        width: "100%",
        backgroundColor: "transparent"
    },
    hr: {
        height: 1,
        backgroundColor: "#EAEAEA"
    },
    listItemCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
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
        fontSize: 18
    },
    textContainer: {
        backgroundColor: "#EAEAEA",
        width: "100%",
        padding: 10
    }
});

AppRegistry.registerComponent("TodoList", () => TodoList);