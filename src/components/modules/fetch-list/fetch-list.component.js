import React, {memo, useRef, useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import {View as ViewAnimate} from 'react-native-animatable';
import PropTypes from 'prop-types';

import LoadingIndicator from '../loading-indicator';
import styles from './fetch-list.style';

const FetchList: () => React$Node = (props, _ref) => {
  // Init Variables
  const ref = useRef({
    adding: false,
    listView: null,
    disableAdding: false,
    loadingIndicator: null,
  }).current;
  const {
    defaultData = [],
    renderItem = () => null,
    style = null,
    contentContainerStyle = null,
    ItemSeparatorComponent = () => null,
    onRefresh = () => null,
    onAdding = () => null,
    onInit = () => null,
  } = props;

  // State
  const [data, setData] = useState(defaultData);
  const [refreshing, setRefreshing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(false);

  // Action
  const _onInit = async () => {
    await ref.loadingIndicator.show();
    const res = await onInit();
    if (Array.isArray(res)) {
      setData(res);
    } else {
      setError(res);
    }
    await ref.loadingIndicator.dismiss();
    await ref.ViewAnimate.fadeIn(300);
  };

  const _onEndReached = async () => {
    console.log('endred');
    if (ref.disableAdding || ref.adding || data.length === 0) {
      return;
    }
    setAdding(true);
    ref.adding = true;
    const res = await onAdding();
    if (res === 'ended') {
      ref.disableAdding = true;
    } else if (Array.isArray(res)) {
      setData(prevData => [...prevData, ...res]);
    }
    setAdding(false);
    ref.adding = false;
    ref.listView.flashScrollIndicators();
  };

  const _onRefresh = async () => {
    setRefreshing(true);
    setError(false);
    ref.disableAdding = false;
    const res = await onRefresh();
    if (Array.isArray(res)) {
      setData(res);
    } else {
      setError(res);
    }
    setRefreshing(false);
  };

  // Lifecycle
  useEffect(() => {
    _onInit();
  }, []);

  // render
  const _renderFooter = () => {
    if (!adding) {
      return null;
    }
    return (
      <View
        style={{
          height: 80,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  };

  const _renderEmptyError = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!error ? <Text>Empty</Text> : <Text>Error</Text>}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ViewAnimate
        ref={node => (ref.ViewAnimate = node)}
        style={{flex: 1, opacity: 0}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          style={style}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={_renderFooter}
          onEndReached={_onEndReached}
          onEndReachedThreshold={0.01}
          refreshing={refreshing}
          ref={node => (ref.listView = node)}
          contentContainerStyle={{flexGrow: 1, ...contentContainerStyle}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          ListEmptyComponent={_renderEmptyError}
        />
      </ViewAnimate>
      <LoadingIndicator ref={node => (ref.loadingIndicator = node)} />
    </View>
  );
};

FetchList.propTypes = {
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  renderItem: PropTypes.func.isRequired,
  ItemSeparatorComponent: PropTypes.func,
  onRefresh: PropTypes.func,
  onInit: PropTypes.func,
  onAdding: PropTypes.func,
  defaultData: PropTypes.array,
};

export default memo(FetchList);
