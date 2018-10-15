import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet, Text, View, AsyncStorage, Alert } from "react-native";
import { Container, Header, Content, Button, Icon} from 'native-base';

export default class PedometerSensor extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        stepGoal: 8000,
        fill: 0,
        progressLeft: 0,
        goalLeft: 100,
        progressRight: 0,
        goalRight: 2000,
    };

    static navigationOptions = {
        title: 'Current Progression',
        headerRight: (
            <Button onPress={() => Alert.alert(
                'Options',
                'My Alert Msg',
                [
                    {text: 'Reset progress', onPress: () => console.log('Ask me later pressed')},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )} transparent>
                <Icon  name="ios-cog" type="Ionicons" />
            </Button>
        )
    };

    componentDidMount() {
        this._subscribe();
        this._retrieveData()
    }

    _retrieveData = async () => {
        /*try {
            await AsyncStorage.getItem("@MyStore:PROGRESS_1", (value) => {
                if(value == null) {
                    this.setState({progressLeft: 0}); } else {
                this.setState({progressLeft: JSON.parse(value)}); //}
                alert(JSON.parse(value));
            }).done();
            await AsyncStorage.getItem("@MyStore:PROGRESS_2", (value) => {
                if(value == null) {
                    this.setState({progressRight: 0}); } else {
                this.setState({progressRight: JSON.parse(value)}); //}
                alert(JSON.parse(value));
            }).done();
        } catch(error) {

        }*/

        try {
            const valueLeft = await AsyncStorage.getItem('@MyStore:PROGRESS_1');
            const valueRight = await AsyncStorage.getItem('@MyStore:PROGRESS_2');
            if (valueLeft !== null) {
                this.setState({progressLeft: JSON.parse(valueLeft)});
            }
            if (valueRight !== null) {
                this.setState({progressRight: JSON.parse(valueRight)});
            }
        } catch (error) {
        }
    };

    componentWillUnmount() {
        this._unsubscribe();
        this._saveData();
    }

    _saveData = () => {
        AsyncStorage.setItem("@MyStore:PROGRESS_1", JSON.stringify(this.state.progressLeft));
        AsyncStorage.setItem("@MyStore:PROGRESS_2", JSON.stringify(this.state.progressRight));
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
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.setState({
                currentStepCount: result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate()-1);
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ pastStepCount: result.steps });
            },
            error => {
                this.setState({
                    pastStepCount: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={230}
                    width={5}
                    rotation={0}
                    lineCap={"butt"}
                    fill={((this.state.pastStepCount+this.state.currentStepCount)/this.state.stepGoal)*100}
                    tintColor="#00e0ff"
                    backgroundColor="#EAEAEA">
                    {
                        () => (
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>{this.state.pastStepCount+this.state.currentStepCount}</Text>
                                <Text style={styles.goalText}>STEPS WALKED</Text>
                                <Text style={[styles.goalText, {marginTop: 0}]}>OUT OF</Text>
                                <Text style={[styles.goalText, {fontSize: 25}]}>{this.state.stepGoal}</Text>
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
                            tintColor="#a2e55b"
                            backgroundColor="#EAEAEA"
                            style={{marginTop: 20, marginRight: 12}}>
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

                        <Button onPress={() => this.changeProgressLeft(1)} block success style={{marginTop: 10, marginLeft: 30, marginRight: 40}}>
                            <Text style={{color: "white"}}>+ 1</Text>
                        </Button>

                        <Button onPress={() => this.changeProgressLeft(-1)} block danger style={{marginTop: 10, marginLeft: 30, marginRight: 40}}>
                            <Text style={{color: "white"}}>- 1</Text>
                        </Button>
                    </View>

                    <View style={styles.smallProgressContainerColumn}>
                        <AnimatedCircularProgress
                            size={150}
                            width={5}
                            fill={((this.state.progressRight)/this.state.goalRight)*100}
                            lineCap={"butt"}
                            rotation={0}
                            tintColor="red"
                            backgroundColor="#EAEAEA"
                            style={{marginTop: 20, marginLeft: 12}}>
                            {
                                () => (
                                    <View style={styles.progressInfo}>
                                        <Text style={styles.progressTextSmall}>{this.state.progressRight}</Text>
                                        <Text style={styles.goalTextSmall}>/ {this.state.goalRight} kcal</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>

                        <Button onPress={() => this.changeProgressRight(100)} block success style={{marginTop: 10, marginLeft: 40, marginRight: 30}}>
                            <Text style={{color: "white"}}>+ 100</Text>
                        </Button>

                        <Button onPress={() => this.changeProgressRight(-50)} block danger style={{marginTop: 10, marginLeft: 40, marginRight: 30}}>
                            <Text style={{color: "white"}}>- 50</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

let Progress = {
    convertToArrayOfObject(progress, callback) {
        return callback(
            progress ? progress.split("||").map((data, i) => ({ key: i, text: data })) : []
        );
    },
    convertToStringWithSeparators(progress) {
        return progress.map(data => data.text).join("||");
    },
    all(callback) {
        return AsyncStorage.getItem("PROGRESS", (err, progress) =>
            this.convertToArrayOfObject(progress, callback)
        );
    },
    save(progress) {
        AsyncStorage.setItem("PROGRESS", this.convertToStringWithSeparators(progress));
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"

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
    }
});

Expo.registerRootComponent(PedometerSensor);
