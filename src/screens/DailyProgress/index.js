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

    // React Navigation configuration
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            title: 'Daily Progress',

            // Setup a right header-button
            headerRight: (
                <Button transparent onPress={params.toggleModal}>
                    <Text style={{color: '#007aff', fontSize: 16}}>Config</Text>
                    <Icon name="ios-cog" style={{color: '#007aff', marginLeft: 7}} type="Ionicons"/>
                </Button>
            )
        };
    };


    // LIFECYCLE METHODS

    componentWillMount() {
        // Send toggleModal-method to Right Header-button as navigationOptions have no access to {this}
        if (this.props.navigation === undefined) {

        } else{
            this.props.navigation.setParams({toggleModal: this._toggleModal});
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this._subscribe();
        this._retrieveData();

        // Changes the color of the status bar to fit with the displayed content
        if (this.props.navigation===undefined) {

        } else {
            this._navListener = this.props.navigation.addListener('didFocus', () => {
                StatusBar.setBarStyle('default');
            });
        }
    }

    // Unsubscribe from all subscriptions, remove listeners and save data to AsyncStorage.
    componentWillUnmount() {
        this._unsubscribe();
        this._saveData();
        this._navListener.remove();
        this._isMounted = false;
    }

    // END LIFECYCLE METHODS


    // Retrieve data from AsyncStorage asynchronously
    _retrieveData = async () => {
        try {
            // Current user-set goal for walked steps.
            const goalStep = JSON.parse(await AsyncStorage.getItem('GOAL_STEP'));
            // Current progress on left meter
            const valueLeft = JSON.parse(await AsyncStorage.getItem('PROGRESS_LEFT'));
            // Current user-set goal on left meter
            const goalLeft = JSON.parse(await AsyncStorage.getItem('GOAL_LEFT'));
            // Current progress on right meter
            const valueRight = JSON.parse(await AsyncStorage.getItem('PROGRESS_RIGHT'));
            // Current user-set goal on right meter
            const goalRight = JSON.parse(await AsyncStorage.getItem('GOAL_RIGHT'));

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

    // Saves data to AsyncStorage
    _saveData = () => {

        // Current progress on left meter
        AsyncStorage.setItem("PROGRESS_LEFT", JSON.stringify(this.state.progressLeft));
        // Current progress on right meter
        AsyncStorage.setItem("PROGRESS_RIGHT", JSON.stringify(this.state.progressRight));
        // Current user-set goal on left meter
        AsyncStorage.setItem("GOAL_LEFT", JSON.stringify(this.state.goalLeft));
        // Current user-set goal on right meter
        AsyncStorage.setItem("GOAL_RIGHT", JSON.stringify(this.state.goalRight));
        // Current user-set goal for walked steps.
        AsyncStorage.setItem("GOAL_STEP", JSON.stringify(this.state.goalStep));
    };

    // Saves a single item to AsyncStorage
    _saveItem = (item, value) => {
        AsyncStorage.setItem(item, JSON.stringify(value));
    };

    // Increment left progress meter by value
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

    // Increment right progress meter by value
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

    // Show congratulary Toast-box upon completion of daily goals
    goalsReached(newStepVal, newLeftVal, newRightVal) {
        if((this.state.pastStepCount+newStepVal >= this.state.goalStep) &&
            (this.state.progressLeft+newLeftVal >= this.state.goalLeft) &&
            (this.state.progressRight+newRightVal >= this.state.goalRight)) {

            this.refs.toast.show('You reached your daily goals, well done!', 2000);
        }
    }

    // Handler that is run each time
    onChanged(value, type) {
        if(type === "steps") {
            this.setState({goalStep: value});
            this._saveItem("GOAL_STEP", value);
        } else if(type === "left") {
            this.setState({goalLeft: value});
            this._saveItem("GOAL_LEFT", value);
        } else if(type === "right") {
            this.setState({goalRight: value});
            this._saveItem("GOAL_RIGHT", value);
        }

    }

    // Subscription method for getting Pedometer-data asynchronously.
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
                alert("Could not get Pedometer:" + error);
            }
        );

        // Get amount of steps walked last 24 hours.
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate()-1); // Gets the pedometer data from the past day.
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

    // Cancel subscriptions
    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    // Toggle display of Modal-component
    _toggleModal = () => {
        let temp = this.state.optionsVisible;
        this.setState({optionsVisible: !temp});
    };

    // Handler that is run when the user chooses to reset their progress
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
                    fill={((this.state.pastStepCount+this.state.currentStepCount)/this.state.goalStep)*100 > 100 ?
                        100 : ((this.state.pastStepCount+this.state.currentStepCount)/this.state.goalStep)*100}
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
                            fill={((this.state.progressLeft)/this.state.goalLeft)*100 > 100 ?
                                100 : ((this.state.progressLeft)/this.state.goalLeft)*100}
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
                                <Text style={{color: "white", fontSize: 11}}>+2</Text>
                            </Button>

                            <Button onPress={() => this.changeProgressLeft(-1)} block danger rounded style={styles.progressButton}>
                                <Text style={{color: "white", fontSize: 11}}>-1</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={styles.smallProgressContainerColumn}>
                        <AnimatedCircularProgress
                            size={150}
                            width={5}
                            fill={((this.state.progressRight)/this.state.goalRight)*100 > 100 ?
                            100 : ((this.state.progressRight)/this.state.goalRight)*100}
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
                                <Text style={{color: "white", fontSize: 11}}>+100</Text>
                            </Button>

                            <Button onPress={() => this.changeProgressRight(-50)} danger rounded style={styles.progressButton}>
                                <Text style={{color: "white", fontSize: 11}}>-50</Text>
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
