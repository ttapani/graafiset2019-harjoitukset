import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


interface IProps {
    radius: number;
    color?: string;
}

export default class Circle extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { radius, color } = this.props;
        return (
            <View style={
                [
                    styles.outerCircle, {
                        width: radius * 2,
                        height: radius * 2,
                        borderRadius: radius,
                        backgroundColor: color ? color : 'red',
                        margin: 8
                    }
                ]
            }/>
            );
            }
        }
            
        const styles = StyleSheet.create({
            outerCircle: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e3e3e3',
            },
        });