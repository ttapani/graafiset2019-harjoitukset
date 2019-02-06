import React from 'react';
import { StyleSheet, Text, View, Button, Slider } from 'react-native';
import RadioSlider from './components/radioslider';
import RadioFrequency from './components/radiofrequency';
import RadioChannelSelector from './components/radiochannelselector';
import { Container, Header, Left, Body, Right, Title, Content, Grid } from 'native-base';

export type RadioState = 'CH1' | 'CH2' | 'CH3' | 'OFF';

const RadioStations = {
    'CH1': 97.5,
    'CH2': 99.9,
    'CH3': 104.2,
};

interface Channels {
    'CH1': number;
    'CH2': number;
    'CH3': number;
};

interface IProps {
    
};

interface IState {
    initialFrequency: number;
    currentFrequency: number;
    channels: Channels;
    state: RadioState;
};

const channelExists = (frequency: number) => {
    const stations = [97.5, 99.9, 104.2];
    if(stations.includes(frequency)) {
        return true;
    }
    return false;
}

const minFrequency = 87;
const maxFrequency = 108;
const ClampFrequency = (min: number, max: number, value: number) => Math.max(min, Math.min(value, max));

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            initialFrequency: 97.5,
            currentFrequency: 97.5,
            channels: RadioStations,
            state: 'OFF'
        };
        this.setFrequency = this.setFrequency.bind(this);
        this.setChannel = this.setChannel.bind(this);
    }

    private setFrequency(value: number, fromSlider: boolean = false) {
        if(fromSlider) {
            // Change the set value on this channel
            let channels = this.state.channels;
            channels[this.state.state] = ClampFrequency(minFrequency, maxFrequency, value);
            // Don't set initialvalue
            this.setState({ initialFrequency: value, currentFrequency: value, channels: channels });
        }
        else {
            let channels = this.state.channels;
            channels[this.state.state] = ClampFrequency(minFrequency, maxFrequency, value);
            // Also set initialvalue
            this.setState({ initialFrequency: value, currentFrequency: value, channels: channels });
        }
    }

    private setChannel(channel: RadioState) {
        if(channel == 'OFF') {
            this.setState({ state: 'OFF' });
        } else {
            this.setState({ state: channel, initialFrequency: this.state.channels[channel], currentFrequency: this.state.channels[channel] });
        }   
    }

    getFrequency = () => {
        const { state, channels } = this.state;
        switch (state) {
            case 'CH1':
                return channels.CH1;
            case 'CH2':
                return channels.CH2;
            case 'CH3':
                return channels.CH3;
            default:
                return 'asd';
        }
    }

    getSlider = () => {
        return (
            <Slider value={this.state.initialFrequency}
                minimumValue={87}
                maximumValue={108}
                step={0.1}
                onValueChange={(value) => this.setFrequency(value, true)}
                disabled={this.state.state == 'OFF'}
            />
        );
    }

    render() {
        const disabled = this.state.state == 'OFF';
        return (
            <Container>
                <Header>
                    <Body>
                        <Title style={{ marginLeft: 8 }}>Radio</Title>
                    </Body>
                </Header>
                <Content>
                    <Grid>
                        <View style={styles.container}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Radio button demo</Text>
                                <RadioFrequency frequency={this.state.currentFrequency} disabled={disabled} hasStation={channelExists(this.state.currentFrequency)}/>
                            </View>
                            <View style={styles.sliderContainer}>
                                <RadioSlider frequency={this.state.initialFrequency} handleValueChanged={this.setFrequency} disabled={disabled}>
                                    <View style={styles.sliderContainer}>
                                        {this.getSlider()}
                                    </View>
                                </RadioSlider>
                            </View>
                            <View style={styles.channelsContainer}>
                                <Text>
                                    Kanavat
                                </Text>
                                <RadioChannelSelector currentShannel={this.state.state} handleChannelSelected={this.setChannel}/>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title={"Test"} onPress={() => console.log("test?")} disabled={disabled}/>
                            </View>
                        </View>
                    </Grid>
                </Content>
            </Container>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 8,
            justifyContent: 'center',
            //alignItems: 'center',
            backgroundColor: '#FFFFFF',
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 120,
            marginRight: 24,
        },
        title: {
            margin: 8,
            flexGrow: 1,
            fontSize: 16,
        },
        sliderContainer: {
            flex: 2,
        },
        channelsContainer: {
            flex: 2,
        },
        buttonContainer: {
            minHeight: 100,
        }
});
    
export default App;