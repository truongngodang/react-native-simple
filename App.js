/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {getGlobal} from 'reactn';
import {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import initReactnPersist from 'reactn-persist';
import {INIT_USER} from './src/reducers/user';
import AppNavigator from './src/components/navigation/navigation.component';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App: () => React$Node = () => {
  const [loaded, setLoaded] = useState(false);

  const _load = async () => {
    await initReactnPersist({
      // REQUIRED.
      storage: AsyncStorage, // localStorage, sessionStorage or any instance with Storage API interface support.
      // Optional.
      whitelist: ['user', 'cards'], // List of top-level keys in global, like ['users', 'token']. Default [].
      debug: true, // Enable console.log mode. Default false.
      key: '@reactn', // Key in storage. Default '@reactn'.
      debounceDelay: 1000, // Persist debounce delay. Default 1000ms.
      initialValue: {
        cards: [],
        user: INIT_USER,
      }, // Object that will be merged with rehydrated global. Default {}.
    });
    console.log(getGlobal());
    setLoaded(true);
  };

  useEffect(() => {
    _load();
  }, []);
  if (!loaded) {
    return <Text>Loading</Text>;
  }
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
