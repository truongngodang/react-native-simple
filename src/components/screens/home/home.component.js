import {memo, useRef} from 'react';
import React, {useDispatch, useGlobal, addReducer, getGlobal} from 'reactn';
import {View, Text, StatusBar, SafeAreaView, Button} from 'react-native';

import styles from './home.style';
import TestPopup from '../../modules/test-popup/test-popup.component';
import {cleanUserReducer, setUserReducer} from '../../../reducers/user';

addReducer('addCard', (global, dispatch, action) => ({
  cards: [...global.cards, action.card],
}));

const HomeScreen: () => React$Node = (props) => {
  const ref = useRef({testPopup: null}).current;
  const {navigation} = props;
  const [cards, setCards] = useGlobal('cards');
  const dispatch = useDispatch();
  const addUser = useDispatch(setUserReducer);
  const cleanUser = useDispatch(cleanUserReducer);

  const _open = async () => {
    //await ref.testPopup.show();
    await dispatch.addCard({card: 2});
    console.log(getGlobal('cards'));
  };

  const _setUser = async () => {
    //await ref.testPopup.show();
    await addUser({data: 'Ngo Dang Truong', token: '3dqweqweqwdadwq'});
    navigation.navigate('News');
  };

  const _cleanUser = async () => {
    //await ref.testPopup.show();
    await cleanUser();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapContainer}>
        <SafeAreaView style={styles.container}>
          <Text>Home Screen</Text>
          <Text>{cards.length}</Text>
          <TestPopup ref={node => (ref.testPopup = node)} />
          <Button title="Open" onPress={_open} />
          <Button title="setUser" onPress={_setUser} />
          <Button title="cleanUser" onPress={_cleanUser} />
        </SafeAreaView>
      </View>
    </>
  );
};

export default memo(HomeScreen);
