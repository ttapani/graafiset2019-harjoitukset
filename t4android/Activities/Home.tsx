import React, {Component} from 'react';
import { BackHandler, Button, StyleSheet, Text, View} from 'react-native';

interface IProps {
}

interface IState {
}


export default class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    private handleBackPress() {
        console.debug(this.props.navigation);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Valitse toiminto</Text>
                <View style={styles.navButton}>
                    <Button title={'Resistanssin laskeminen'} onPress={() => navigate('Resistance')}/>
                </View>
                <View style={styles.navButton}>
                <Button title={'Jännitteen laskeminen'} onPress={() => navigate('Voltage')}/>
                </View>
                <View style={styles.navButton}>
                <Button title={'Virran laskeminen'} onPress={() => navigate('Current')}/>
                </View>
                <View style={styles.navButton}>
                <Button title={'Lopeta sovellus'} onPress={() => BackHandler.exitApp()}/>
                </View>
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
        navButton: {
            width: '80%',
        }
});
    