import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Grid, Row, Radio, Text } from 'native-base';
import { RadioState } from '../App';

interface IProps {
    currentShannel: RadioState;
    handleChannelSelected: (channel: RadioState) => void;
};

class RadioChannelSelector extends Component<IProps> {
    render() {
        const { currentShannel, handleChannelSelected } = this.props;
        return (
            <Grid style={styles.container}>
                <Row>
                    <TouchableOpacity onPress={() => handleChannelSelected('CH1')} style={{ flexDirection: 'row', margin: 8 }}>
                        <Radio disabled selected={currentShannel == 'CH1' ? true : false}/>
                        <Text style={{ marginLeft: 8 }}>CH1</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => handleChannelSelected('CH2')} style={{ flexDirection: 'row', margin: 8 }}>
                        <Radio disabled selected={currentShannel == 'CH2' ? true : false}/>
                        <Text style={{ marginLeft: 8 }}>CH2</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => handleChannelSelected('CH3')} style={{ flexDirection: 'row', margin: 8 }}>
                        <Radio disabled selected={currentShannel == 'CH3' ? true : false}/>
                        <Text style={{ marginLeft: 8 }}>CH3</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => handleChannelSelected('OFF')} style={{ flexDirection: 'row', margin: 8 }}>
                        <Radio disabled selected={currentShannel == 'OFF' ? true : false}/>
                        <Text style={{ marginLeft: 8 }}>Off</Text>
                    </TouchableOpacity>
                </Row>
            </Grid>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            //alignSelf: 'flex-end',
            margin: 8,
        },
});
    
export default RadioChannelSelector;
