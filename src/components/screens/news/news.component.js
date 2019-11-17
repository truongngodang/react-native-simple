import React from 'reactn';
import {memo, useRef} from 'react';
import {View, Text, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import HeaderBar from '../../modules/header-bar';
import NewsItem from '../../modules/news-item';
import api from '../../../api';

import styles from './news.style';
import FetchList from '../../modules/fetch-list';

const NewsScreen: () => React$Node = props => {
  // init variables
  const ref = useRef({page: 1}).current;
  // props
  const {navigation} = props;

  // state

  // lifecycle

  // action
  const _fetchProducts = async () => {
    try {
      ref.page = 1;
      const res = await api.products.getProducts(ref.page);
      return res.data;
    } catch (e) {
      return e;
    }
  };

  const _addingProducts = async () => {
    try {
      ref.page = ref.page + 1;
      const res = await api.products.getProducts(ref.page);
      if (res.data.length === 0) {
        return 'ended';
      }
      return res.data;
    } catch (e) {
      return e;
    }
  };

  // render
  const _renderItem = ({item, index}) => {
    return (
      <NewsItem
        data={item}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.wrapContainer}>
        <SafeAreaView style={styles.container} forceInset={{top: 'never'}}>
          <HeaderBar renderCenter={<Text style={styles.title}>News</Text>} />
          <View style={styles.body}>
            <FetchList
              renderItem={_renderItem}
              contentContainerStyle={styles.wrapList}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              onRefresh={_fetchProducts}
              onAdding={_addingProducts}
              onInit={_fetchProducts}
            />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default memo(NewsScreen);
