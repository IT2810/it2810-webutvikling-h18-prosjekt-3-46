import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TextInput,
    StatusBar
} from "react-native";
import { Button, Icon} from 'native-base';
import Modal from "react-native-modal";
import Toast from "react-native-easy-toast";

export default class DailyProgress extends React.Component {
    constructor(props) {
        super(props);

        // Avoid async tasks being run after component is unmounted:
        this._isMounted = false;
    }
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        goalStep: 8000,
        fill: 0,
        progressLeft: 0,
        goalLeft: 100,
        progressRight: 0,
        goalRight: 2000,
        optionsVisible: false,
        showToast: false
    };

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            title: 'Daily Progress',
            headerRight: (
                <Button transparent onPress={params.toggleModal}>
                    <Icon name="ios-cog" type="Ionicons"/>
                </Button>
            )
        };
    };

    componentWillMount() {
        this.props.navigation.setParams({toggleModal: this._toggleModal});
    }

    componentDidMount() {
        this._isMounted = true;
        this._subscribe();
        this._retrieveData();

        // Changes the color of the status bar to fit with the displayed content
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('default');
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._saveData();
        this._navListener.remove();
        this._isMounted = false;
    }


    _retrieveData = async () => {
        try {
            const goalStep = JSON.parse(await AsyncStorage.getItem('GOAL_STEP'));
            const valueLeft = JSON.parse(await AsyncStorage.getItem('PROGRESS_LEFT'));
            const goalLeft = JSON.parse(await AsyncStorage.getItem('GOAL_1'));
            const valueRight = JSON.parse(await AsyncStorage.getItem('PROGRESS_RIGHT'));
            const goalRight = JSON.parse(await AsyncStorage.getItem('GOAL_2'));

            if (valueLeft !== null && valueLeft !== undefined) {
                this._isMounted && this.setState({progressLeft: valueLeft});
            }
            if (valueRight !== null && valueRight !== undefined) {
                this._isMounted && this.setState({progressRight: valueRight});
            }
            if (goalLeft !== null && goalLeft !== undefined) {
                this._isMounted && this.setState({goalLeft: goalLeft});
            }
            if (goalRight !== null && goalRight !== undefined) {
                this._isMounted && this.setState({goalRight: goalRight});
            }
            if (goalStep !== null && goalStep !== undefined) {
                this._isMounted && this.setState({goalStep: goalStep});
            }
        } catch (error) {
        }
    };

    _saveData = () => {
        AsyncStorage.setItem("PROGRESS_LEFT", JSON.stringify(this.state.progressLeft));
        AsyncStorage.setItem("PROGRESS_RIGHT", JSON.stringify(this.state.progressRight));
        AsyncStorage.setItem("GOAL_1", JSON.stringify(this.state.goalLeft));
        AsyncStorage.setItem("GOAL_2", JSON.stringify(this.state.goalRight));
        AsyncStorage.setItem("GOAL_STEP", JSON.stringify(this.state.goalStep));
    };

    _saveItem = (item, value) => {
        AsyncStorage.setItem(item, JSON.stringify(value));
    };

    changeProgressLeft(value) {
        if(this.state.progressLeft+value < 0) {
            this.setState({
            progressLeft: 0
            });
        return;
        }

        let progress = this.state.progressLeft;
        this.setState({
            progressLeft: progress+value
        });
        this.goalsReached(0,value,0);
        this._saveItem("PROGRESS_LEFT", progress+value);
    }

    changeProgressRight(value) {
        if(this.state.progressRight+value < 0) {
            this.setState({
                progressRight: 0
            });
            return;
        }

        let progress = this.state.progressRight;
        this.setState({
            progressRight: progress+value
        });
        this.goalsReached(0,0,value);
        this._saveItem("PROGRESS_RIGHT", progress+value);
    }

    goalsReached(newStepVal, newLeftVal, newRightVal) {
        if((this.state.pastStepCount+newStepVal >= this.state.goalStep) &&
            (this.state.progressLeft+newLeftVal >= this.state.goalLeft) &&
            (this.state.progressRight+newRightVal >= this.state.goalRight)) {

            this.refs.toast.show('You reached your daily goals, well done!', 2000);
        }
    }

    onChanged(value, type) {
        if(type === "steps") {
            this.setState({goalStep: value});
            this._saveItem("GOAL_STEP", value);
        } else if(type === "left") {
            this.setState({goalLeft: value});
            this._saveItem("GOAL_1", value);
        } else if(type === "right") {
            this.setState({goalRight: value});
            this._saveItem("GOAL_2", value);
        }


    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this._isMounted && this.setState({
                currentStepCount: result.steps
            });
            this.goalsReached(result.steps,0,0);
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this._isMounted && this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this._isMounted && this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate()-1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this._isMounted && this.setState({ pastStepCount: result.steps });
            },
            error => {
                this._isMounted && this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    _toggleModal = () => {
        let temp = this.state.optionsVisible;
        this.setState({optionsVisible: !temp});
    };

    resetProgress = () => {
        this.setState({progressLeft: 0, progressRight: 0});
        this._toggleModal();
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Modal isVisible={this.state.optionsVisible} style={styles.modalContent}>
                        <View style={styles.container}>
                            <Text style={{marginTop: 20}}>Set daily steps goal:</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType = 'numeric'
                                    onChangeText = {(val)=> this.onChanged(val, "steps")}
                                    value = {this.state.goalStep.toString()}
                                    returnKeyType="done"
                                    returnKeyLabel="done"
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <Text style={{marginTop:20}}>Set daily push-up goal:</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType = 'numeric'
                                    onChangeText = {(val)=> this.onChanged(val, "left")}
                                    value = {this.state.goalLeft.toString()}
                                    returnKeyType="done"
                                    returnKeyLabel="done"
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <Text style={{marginTop:20}}>Set daily calorie goal:</Text>
                            <View style={styles.textContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType = 'numeric'
                                    onChangeText = {(val)=> this.onChanged(val, "right")}
                                    value = {this.state.goalRight.toString()}
                                    returnKeyType="done"
                                    returnKeyLabel="done"
                                    underlineColorAndroid='transparent'
                                />
                            </View>

                            <Button block danger onPress={this.resetProgress} style={{marginTop: 20}}>
                                <Text style={{color: "white"}}>Reset daily Progress</Text>
                            </Button>
                            <Button block onPress={this._toggleModal} style={{marginTop: 20}}>
                                <Text style={{color: "white"}}>Close</Text>
                            </Button>
                        </View>
                    </Modal>
                </View>
                <AnimatedCircularProgress
                    size={230}
                    width={5}
                    rotation={0}
                    lineCap={"butt"}
                    fill={((this.state.pastStepCount+this.state.currentStepCount)/this.state.goalStep)*100}
                    tintColor={(this.state.pastStepCount+this.state.currentStepCount >= this.state.goalStep) ? "#a2e55b" : "#00e0ff"}
                    backgroundColor="#EAEAEA">
                    {
                        () => (
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>{this.state.pastStepCount+this.state.currentStepCount}</Text>
                                <Text style={[styles.goalText, {fontSize: 20}]}>/ {this.state.goalStep}</Text>
                                <Text style={[styles.goalText, {marginTop: 0}]}>STEPS WALKED</Text>
                                <Text style={[styles.goalText, {fontSize: 10}]}>(past 24 hrs)</Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
                <View style={styles.smallProgressContainer}>
                    <View style={styles.smallProgressContainerColumn}>
                        <AnimatedCircularProgress
                            size={150}
                            width={5}
                            fill={((this.state.progressLeft)/this.state.goalLeft)*100}
                            lineCap={"butt"}
                            rotation={0}
                            tintColor={(this.state.progressLeft >= this.state.goalLeft) ? "#a2e55b" : "#FFDF00"}
                            backgroundColor="#EAEAEA"
                            style={{margin: 10}}>
                            {
                                () => (
                                    <View style={styles.progressInfo}>
                                        <Text style={styles.progressTextSmall}>{this.state.progressLeft}</Text>
                                        <Text style={styles.goalTextSmall}>/ {this.state.goalLeft}</Text>
                                        <Text style={styles.goalTextSmall}>PUSH-UPS</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                        <View style={{flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: "center"}}>
                            <Button onPress={() => this.changeProgressLeft(2)} block success rounded style={styles.progressButton}>
                                <Text style={{color: "white"}}>+2</Text>
                            </Button>

                            <Button onPress={() => this.changeProgressLeft(-1)} block danger rounded style={styles.progressButton}>
                                <Text style={{color: "white"}}>-1</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={styles.smallProgressContainerColumn}>
                        <AnimatedCircularProgress
                            size={150}
                            width={5}
                            fill={((this.state.progressRight)/this.state.goalRight)*100}
                            lineCap={"butt"}
                            rotation={0}
                            tintColor={(this.state.progressRight >= this.state.goalRight) ? "#a2e55b" : "red"}
                            backgroundColor="#EAEAEA"
                            style={{margin: 10}}>
                            {
                                () => (
                                    <View style={styles.progressInfo}>
                                        <Text style={styles.progressTextSmall}>{this.state.progressRight}</Text>
                                        <Text style={styles.goalTextSmall}>/ {this.state.goalRight}</Text>
                                        <Text style={styles.goalTextSmall}>KCAL</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                        <View style={{flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: "center"
                            }}>
                            <Button onPress={() => this.changeProgressRight(100)} success rounded style={styles.progressButton}>
                                <Text style={{color: "white"}}>+100</Text>
                            </Button>

                            <Button onPress={() => this.changeProgressRight(-50)} danger rounded style={styles.progressButton}>
                                <Text style={{color: "white"}}>-50</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                <Toast ref="toast"
                       style={{backgroundColor:"#5cb85c"}}
                       position='top'
                       positionValue={250}
                       fadeInDuration={400}
                       fadeOutDuration={900}
                       opacity={1}
                       textStyle={{color:'white', fontSize: 15, padding: 7,
                           paddingLeft: 15, paddingRight: 15}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        width: "100%"

    },
    smallProgressContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"

    },
    smallProgressContainerColumn: {
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"

    },
    progressInfo: {
        alignItems: "center",
    },
    progressText: {
        fontSize: 45,
        letterSpacing: 7,
        paddingLeft: 10,
        marginTop: 15,
        color: "#8E8E8E"
    },
    goalText: {
        fontSize: 15,
        letterSpacing: 3,
        paddingLeft: 4,
        color: "#8E8E8E"
    },
    progressTextSmall: {
        fontSize: 25,
        letterSpacing: 3,
        paddingLeft: 5,
        color: "#8E8E8E"
    },
    goalTextSmall: {
        fontSize: 10,
        letterSpacing: 1,
        paddingLeft: 1,
        color: "#8E8E8E"
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
    textContainer: {
        backgroundColor: "white",
        padding: 10,
        width: "100%"
    },
    progressButton: {
        marginLeft: 3,
        marginRight: 3,
        justifyContent: "center",
        alignItems: "center",
        flex: 0.45
    }
});



Expo.registerRootComponent(DailyProgress);
