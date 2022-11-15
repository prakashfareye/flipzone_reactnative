/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import RegisterUser from './src/components/RegisterUser';
import Home from './src/components/Home'
import Search from './src/components/Search'
import ProductList from './src/components/ProductList'
import Product from './src/components/Product'
import Cart from './src/components/Cart'
import Footer from './src/components/Footer'
import Summary from './src/components/Summary'
import Transaction from './src/components/Transaction'


AppRegistry.registerComponent(appName, () => App);
