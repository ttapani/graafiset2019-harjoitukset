/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Activities/Home';
import Resistance from './Activities/Resistance';
import Current from './Activities/Current';
import Voltage from './Activities/Voltage';

const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    Resistance: {screen: Resistance},
    Current: {screen: Current},
    Voltage: {screen: Voltage},
});  

const AppWithNavigation = createAppContainer(MainNavigator);

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => AppWithNavigation);