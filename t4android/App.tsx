/**
* Sample React Native App
* https://github.com/facebook/react-native
* 
* Generated with the TypeScript template
* https://github.com/emin93/react-native-template-typescript
* 
* @format
*/

import React, {Component} from 'react';
import { Button,StyleSheet, Text, TextInput, View} from 'react-native';

interface IProps {

}

interface IState {
    value?: number;
    input: string;
}

const DIVIDEND = 123.456;

export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { input: '' }
        this.calculate = this.calculate.bind(this);
        this.calcualteIfNotEmpty = this.calcualteIfNotEmpty.bind(this);
    }

    private move(input: string) {
        let value = parseFloat(input);
        if (!isNaN(value) || value === 0) {
            this.setState({ value: value });
        }
        else {
            this.setState({ value: undefined });
        }
    }

    private calculate(dividend: number, input?: number) {
        if(input && input != 0) {
            this.setState({ value: dividend / input });
        }
    }

    private calcualteIfNotEmpty() {

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, margin: 8}}
                    onChangeText={(text) => this.setState({input: text})}
                    keyboardType='numeric'
                />
                <Text>{this.state.value ? this.state.value : '---' }</Text>
                <Button title={'Siirrä'} onPress={() => this.move(this.state.input)}/>
                <Button title={'Laske'} onPress={() => this.calculate(DIVIDEND, this.state.value, )}/>
                <Button title={'Laske jos ei tyhjä'}/>
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            padding: 8
    },
});
    