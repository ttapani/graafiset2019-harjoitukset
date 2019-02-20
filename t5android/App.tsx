import React, {Component} from 'react';
import { Button, Platform, StyleSheet, Text, View} from 'react-native';
import Circle from './Circle';
import Square from './Square';

interface IProps {

}

interface IState {
    position: number;
}


export default class App extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { position: 5 };
        this.drawCircles = this.drawCircles.bind(this);
        this.drawSquares = this.drawSquares.bind(this);
    }

    private drawCircles() {
        let circles = [];
        for(let i = 0; i < 7; i++) {
            circles.push(<Circle key={i} radius={1 + i * 7}/>)
        }
        return circles;
    }

    private drawSquares() {
        let squares = [];
        for(let i = 0; i < 7; i++) {
            squares.push(<Square key={i} side={1 + i * 10}/>)
        }
        return squares;
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Circle radius={15} color={'blue'}/>
                <Square side={30} color={'blue'}/>
            </View>
                <View style={{ flex: 15, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', marginLeft: this.state.position }}>
                        {this.drawCircles()}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', marginLeft: this.state.position + 50 }}>
                        {this.drawSquares()}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
                    <Button title={'<'} onPress={() => this.setState({ position: this.state.position - 35 })} />
                    <Button title={'>'} onPress={() => this.setState({ position: this.state.position + 35 })} />
                </View>
            </View>
            );
            }
        }
            
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            },
            outerCircle: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e3e3e3',
            },
        });