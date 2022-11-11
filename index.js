/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import RegisterUser from './src/components/RegisterUser';

AppRegistry.registerComponent(appName, () => RegisterUser);
