import React, {Component} from 'react';
import {Slider, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Arrow from './arrow';

interface IProps {
    frequency: number;
    handleValueChanged: (value: number) => void;
    disabled: boolean;
};

const moveFrequencyInterval = 100;

const initialValue = 97.5;

class RadioSlider extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.moveFrequency = this.moveFrequency.bind(this); 
        this.timerId = undefined;
    }

    private timerId?: number;

    private moveFrequency(delta: number, rate: number) {
        this.timerId = setInterval(() => {
            this.props.handleValueChanged(this.props.frequency + delta);
        }, rate)
    }

    private stopMoveFrequency() {
        if(this.timerId)
            clearInterval(this.timerId);
    }

    shouldComponentUpdate(nextProps: IProps): boolean {
        if(this.props.frequency !== nextProps.frequency) {
            return true;
        }
        if(this.props.disabled !== nextProps.disabled) {
            return true;
        }
        return false;
    }

    render() {
        const { frequency, handleValueChanged, disabled } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.bandsContainer}>
                    <Text>87 MHz</Text>
                    <Text>97,5 MHz</Text>
                    <Text>108 Mhz</Text>
                </View>
                    {this.props.children}
                <View style={{ flex: 1, flexDirection: 'row', margin: 8, justifyContent: 'space-evenly'}}>
                    <TouchableOpacity onPressIn={() => this.moveFrequency(-1, moveFrequencyInterval)} onPressOut={() => this.stopMoveFrequency()} disabled={disabled}>
                        <Arrow size={'long'} disabled={disabled}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => this.moveFrequency(-0.1, moveFrequencyInterval)} onPressOut={() => this.stopMoveFrequency()} disabled={disabled}>
                        <Arrow disabled={disabled}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => this.moveFrequency(0.1, moveFrequencyInterval)} onPressOut={() => this.stopMoveFrequency()} disabled={disabled}>
                        <Arrow direction={'right'} disabled={disabled}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => this.moveFrequency(1, moveFrequencyInterval)} onPressOut={() => this.stopMoveFrequency()} disabled={disabled}>
                        <Arrow direction={'right'} size={'long'} disabled={disabled}/>
                    </TouchableOpacity>
                </View>
            </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
        },
        bandsContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
        },
        sliderContainer: {
            alignSelf: 'stretch',
            flex: 1,
        }
});
    
export default RadioSlider;
