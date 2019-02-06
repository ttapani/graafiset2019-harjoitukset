import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
    frequency: number;
    disabled: boolean;
    hasStation: boolean;
};

class RadioFrequency extends Component<IProps> {
    render() {
        const { frequency, hasStation, disabled } = this.props;
        return (
            <View style={styles.container}>
                <Text style={[styles.frequencyBox, hasStation && !disabled ? styles.hasStation : styles.noStation, hasStation && disabled ? styles.radioOff : null]}>{frequency.toPrecision(4).toString() + ' MHz'}</Text>
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //alignSelf: 'flex-end',
            marginRight: 8,
        },
        frequencyBox: {
            padding: 8,
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            width: 140,
            textAlign: 'center',
            marginRight: 8,
        },
        noStation: {
            backgroundColor: 'red',
        },
        hasStation: {
            backgroundColor: 'green',
        },
        radioOff: {
            backgroundColor: 'gray',
        }
});
    
export default RadioFrequency;
