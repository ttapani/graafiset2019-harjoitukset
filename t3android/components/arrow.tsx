import React, {Component} from 'react';
import {Slider, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';

interface IProps {
    direction?: 'left' | 'right';
    size?: 'short' | 'long';
    disabled?: boolean;
};

class Arrow extends Component<IProps> {
    static defaultProps = {
        direction: 'left',
        size: 'short',
        disabled: false,
    }

    render() {
        const styles = makeStyles(this.props);
        return (
            <View style={styles.base}>
                <View style={styles.tail}/>
                <View style={styles.tipBorder}/>
                <View style={styles.tip}/>
            </View>
            );
        }
    }
    
    const makeStyles = (props: IProps) => StyleSheet.create({
        base: {
            flexDirection: 'row',
            width: props.size == 'short' ? 65 : 110,
            transform: [
                {scale: 0.75},
                props.direction == 'left' ? {rotate: '180deg'} : {rotate: '0deg'},
            ],
        },
        tipBorder: {
            marginTop: props.direction == 'right' ? -12 : 0,
            position: 'absolute',
            right: 0,
            top: 0,
            borderTopWidth: 20,
            borderTopColor: 'transparent',
            borderBottomWidth: 20,
            borderBottomColor: 'transparent',
            borderLeftWidth: 30,
            borderLeftColor: 'black',
            borderStyle: 'solid',
            zIndex: -1,
        },
        tip: {
            marginTop: props.direction == 'right' ? -12 : 0,
            position: 'absolute',
            right: 1,
            top: 0,
            borderTopWidth: 20,
            borderTopColor: 'transparent',
            borderBottomWidth: 20,
            borderBottomColor: 'transparent',
            borderLeftWidth: 30,
            borderLeftColor: props.disabled == false ? 'red' : 'gray',
            borderStyle: 'solid',
            transform: [
                {scale: 0.8}
            ],
        },
        tail: {
            marginTop: props.direction == 'right' ? 0 : 12,
            marginBottom: props.direction == 'left' ? 0 : 12,
            width: props.size == 'short' ? 37 : 82,
            backgroundColor: props.disabled == false ? 'red' : 'gray',
            height: 16,
            borderLeftWidth: 2,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderRightColor: props.disabled == false ? 'red' : 'gray',
            zIndex: 1,
        }
});
    
export default Arrow;
