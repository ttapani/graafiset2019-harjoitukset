import React, {Component} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface IProps {

}

interface IState {
    resistanceInput: string;
    voltageInput: string;
    current?: number;
}

export const calculateCurrent = (resistance: number, voltage: number) => voltage / resistance;

export const parseValue = (input: string) => {
    let value = parseFloat(input);
    if(!isNaN(value)) {
        return value;
    }
    else 
        return undefined;
}


export default class Current extends Component<IProps, IState> {
    static navigationOptions = {
        title: 'Virta',
    };

    constructor(props: IProps) {
        super(props);
        this.state = { voltageInput: '', resistanceInput: '' }
        this.calculate = this.calculate.bind(this);
    }

    private calculate(resistance: string, voltage: string) {
        let ohms = parseValue(resistance);
        let volts = parseValue(voltage);
        if(ohms && volts) {
            this.setState({ current: calculateCurrent(ohms, volts)});
        }
    }

    render() {
        const { voltageInput, resistanceInput, current } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.subtitle}>Resistanssi</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8 }}
                    onChangeText={(text) => this.setState({ resistanceInput: text })}
                    keyboardType='numeric'
                />
                <Text style={styles.subtitle}>Jännite</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8 }}
                    onChangeText={(text) => this.setState({ voltageInput: text })}
                    keyboardType='numeric'
                />
                <View style={{ margin: 8 }}>
                    <Button 
                        title={'Laske virta'}
                        onPress={() => this.calculate(resistanceInput, voltageInput)}
                    />
                </View>
                <Text style={styles.subtitle}>Virta =</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 8, fontSize: 20, fontWeight: 'bold', color: 'black' }}
                    keyboardType='numeric'
                    value={current ? current.toString(): '---' }
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
    