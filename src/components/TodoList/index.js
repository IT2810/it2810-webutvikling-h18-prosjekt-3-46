import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    Button,
    TextInput,
    Keyboard,
    Platform
} from "react-native";
import Swipeout from 'react-native-swipeout';


const isAndroid = Platform.OS === "android";
const viewPadding = 10;

export default class TodoList extends Component {
    state = {
        tasks: [],
        text: ""
    };


    static navigationOptions = {
        title: 'Tasks'
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
    };

    componentDidMount() {
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
        );

        Keyboard.addListener(
            isAndroid ? "keyboardDidHide" : "keyboardWillHide",
            () => this.setState({ viewPadding: viewPadding })
        );

        Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
    }

    renderTask(item, index) {
        let swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: 'red',
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
                            <Text style={styles.listItem}>
                                {item.text}
                            </Text>
                        </View>
                    </Swipeout>
                </View>
                <View style={styles.hr} />
            </View>
        )
    }
    render() {

        return (
            <View
                style={[styles.container, { paddingBottom: this.state.viewPadding }]}
            >
                <FlatList
                    keyExtractor = { (item, index) => index.toString() }
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item, index }) => this.renderTask(item, index)}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.addTask}
                    value={this.state.text}
                    placeholder="Add Tasks"
                    returnKeyType="done"
                    returnKeyLabel="done"
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
        backgroundColor: "#F5FCFF",
        padding: viewPadding,
        paddingTop: 0,
        width: "100%"
    },
    list: {
        width: "100%"
    },
    listItem: {
        padding: 8,
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
        borderColor: "#EAEAEA",
        borderWidth: isAndroid ? 0 : 1,
        width: "100%",
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: "white",
        fontSize: 18
    }
});

AppRegistry.registerComponent("TodoList", () => TodoList);