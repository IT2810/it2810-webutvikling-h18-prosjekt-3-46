import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet, Text, View } from "react-native";

export default class PedometerSensor extends React.Component {
    state = {
        isPedometerAvailable: "checking",
        pastStepCount: 0,
        currentStepCount: 0,
        goal: 8000,
        fill: 0
    };

    static navigationOptions = {
        title: 'Current Progression'
    };

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
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
        start.setDate(end.getDate() - 1);
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
                    rotaion={270}
                    lineCap={"butt"}
                    fill={((this.state.pastStepCount+this.state.currentStepCount)/this.state.goal)*100}
                    tintColor="#00e0ff"
                    backgroundColor="#EAEAEA">
                    {
                        () => (
                            <View style={styles.progressInfo}>
                                <Text style={styles.progressText}>{this.state.pastStepCount+this.state.currentStepCount}</Text>
                                <Text style={styles.goalText}>STEPS WALKED</Text>
                                <Text style={[styles.goalText, {marginTop: 0}]}>OUT OF</Text>
                                <Text style={[styles.goalText, {fontSize: 25}]}>{this.state.goal}</Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
                <View style={styles.smallProgressContainer}>
                    <AnimatedCircularProgress
                        size={150}
                        width={5}
                        fill={20}
                        lineCap={"butt"}
                        rotaion={-90}
                        tintColor="#a2e55b"
                        backgroundColor="#EAEAEA"
                        style={{marginTop: 20, marginRight: 12}}>
                        {
                            () => (
                                <View style={styles.progressInfo}>
                                    <Text style={styles.progressTextSmall}>20</Text>
                                    <Text style={styles.goalTextSmall}>/ 100</Text>
                                    <Text style={styles.goalTextSmall}>PUSH-UPS</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                    <AnimatedCircularProgress
                        size={150}
                        width={5}
                        fill={50}
                        lineCap={"butt"}
                        rotaion={-90}
                        tintColor="red"
                        backgroundColor="#EAEAEA"
                        style={{marginTop: 20, marginLeft: 12}}>
                        {
                            () => (
                                <View style={styles.progressInfo}>
                                    <Text style={styles.progressTextSmall}>1943</Text>
                                    <Text style={styles.goalTextSmall}>/ 2500 kcal</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </View>
        );
    }
}

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
