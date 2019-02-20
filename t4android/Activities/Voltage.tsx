import React, {Component} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface IProps {

}

interface IState {
    resistanceInput: string;
    currentInput: string;
    voltage?: number;
}

export const calculateVoltage = (current: number, resistance: number) => current * resistance;

export const parseValue = (input: string) => {
    let value = parseFloat(input);
    if(!isNaN(value)) {
        return value;
    }
    else 
        return undefined;
}


export default class Voltage extends Component<IProps, IState> {
    static navigationOptions = {
        title: 'Jännite',
    };

    constructor(props: IProps) {
        super(props);
        this.state = { resistanceInput: '', currentInput: '' }
        this.calculate = this.calculate.bind(this);
    }

    private calculate(resistance: string, current: string) {
        let ohms = parseValue(resistance);
        let amps = parseValue(current);
        if(ohms && amps) {
            this.setState({ voltage: calculateVoltage(ohms, amps)});
        }
    }

    render() {
        const { resistanceInput, currentInput, voltage } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.subtitle}>Resistanssi</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8 }}
                    onChangeText={(text) => this.setState({ resistanceInput: text })}
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
                        
                        title={'Laske jännite'}
                        onPress={() => this.calculate(resistanceInput, currentInput)}
                    />
                </View>
                <Text style={styles.subtitle}>Jännite =</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8, fontSize: 20, fontWeight: 'bold', color: 'black' }}
                    keyboardType='numeric'
                    value={voltage ? voltage.toString(): '---' }
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
    