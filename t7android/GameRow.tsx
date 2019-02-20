import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export const sideLength = 30;

interface IProps {
    tiles: string[];
    tileClicked: (index: number) => void;
    disabled: boolean;
    tileMask: number[];
}


export default class GameRow extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.tiles.map((tile, index) =>
                    <TouchableHighlight key={index} disabled={tile !== '' || this.props.disabled ? true : false } onPress={() => this.props.tileClicked(index)}>
                        <View style={[styles.tile, { backgroundColor: this.props.tileMask.includes(index) ? 'teal' : '#F5FCFF' }]}>
                                <Text style={[styles.marker, { color: tile === 'X' ? 'red' : 'blue' }]}>{tile}</Text>
                        </View>
                    </TouchableHighlight>)}
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#F5FCFF',
        },
        tile: {
            width: sideLength,
            height: sideLength,
            borderStyle: 'solid',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        marker: {
            fontWeight: 'bold',
            fontSize: 20,

        }
    });
    