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
                <Text>
                    Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
                </Text>
                <Text>
                    Steps taken in the last 24 hours: {this.state.pastStepCount}
                </Text>
                <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
                <AnimatedCircularProgress
                    size={200}
                    width={15}
                    fill={((this.state.pastStepCount+this.state.currentStepCount)/this.state.goal)*100}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        () => (
                            <Text>
                                {this.state.pastStepCount+this.state.currentStepCount} / {this.state.goal}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});

Expo.registerRootComponent(PedometerSensor);
