import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


interface IProps {
    side: number;
    color?: string;
}

export default class Square extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { side, color } = this.props;
        return (
            <View style={
                [
                    styles.outerSquare, {
                        width: side,
                        height: side,
                        //borderRadius: side,
                        backgroundColor: color ? color : 'green',
                        margin: 16
                    }
                ]
            }/>
            );
            }
        }
            
        const styles = StyleSheet.create({
            outerSquare: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e3e3e3',
            },
        });