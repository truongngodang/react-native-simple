/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import addReactNDevTools from 'reactn-devtools';
addReactNDevTools();

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
