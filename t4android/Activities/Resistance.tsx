import React, {Component} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface IProps {

}

interface IState {
    voltageInput: string;
    currentInput: string;
    resistance?: number;
}

export const calculateResistance = (voltage: number, current: number) => voltage / current;

export const parseValue = (input: string) => {
    let value = parseFloat(input);
    if(!isNaN(value)) {
        return value;
    }
    else 
        return undefined;
}


export default class Resistance extends Component<IProps, IState> {
    static navigationOptions = {
        title: 'Resistanssi',
    };

    constructor(props: IProps) {
        super(props);
        this.state = { voltageInput: '', currentInput: '' }
        this.calculate = this.calculate.bind(this);
    }

    private calculate(voltage: string, current: string) {
        let volts = parseValue(voltage);
        let amps = parseValue(current);
        if(volts && amps) {
            this.setState({ resistance: calculateResistance(volts, amps)});
        }
    }

    render() {
        const { voltageInput, currentInput, resistance } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.subtitle}>Jännite</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8 }}
                    onChangeText={(text) => this.setState({ voltageInput: text })}
                    keyboardType='numeric'
                />
                <Text style={styles.subtitle}>Virta</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8 }}
                    onChangeText={(text) => this.setState({ currentInput: text })}
                    keyboardType='numeric'
                />
                <View style={{ margin: 8 }}>
                    <Button 
                        
                        title={'Laske resistanssi'}
                        onPress={() => this.calculate(voltageInput, currentInput)}
                    />
                </View>
                <Text style={styles.subtitle}>Resistanssi =</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8, fontSize: 20, fontWeight: 'bold', color: 'black' }}
                    keyboardType='numeric'
                    value={resistance ? resistance.toString(): '---' }
                    editable={false}
                />
                <Text></Text>
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            backgroundColor: '#F5FCFF',
            padding: 8
        },
        subtitle: {
            fontSize: 16,
            fontWeight: 'bold'
        }
});
    