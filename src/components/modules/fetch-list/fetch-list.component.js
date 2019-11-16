import React, {memo, useRef, useEffect, useState, useCallback} from 'react';
import {FlatList, View, RefreshControl, ActivityIndicator} from 'react-native';
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
    data = [],
    renderItem = () => null,
    style = null,
    contentContainerStyle = null,
    ItemSeparatorComponent = () => null,
    onRefresh = () => null,
    onAdding = () => null,
    onInit = () => null,
  } = props;

  // State
  const [refreshing, setRefreshing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [initing, setIniting] = useState(false);

  // Lifecycle
  useEffect(() => {
    setIniting(true);
  }, []);

  useEffect(() => {
    if (initing) {
      _onInit();
    }
  }, [_onInit, initing]);

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

  // Action
  const _onInit = useCallback(async () => {
    await ref.loadingIndicator.show();
    await onInit();
    await ref.loadingIndicator.dismiss();
    setIniting(false);
  }, [onInit, ref.loadingIndicator]);

  const _onEndReached = async () => {
    if (ref.disableAdding || ref.adding) {
      return;
    }
    setAdding(true);
    ref.adding = true;
    const res = await onAdding();
    if (res === 'ended') {
      ref.disableAdding = true;
    }
    setAdding(false);
    ref.adding = false;
    ref.listView.flashScrollIndicators();
  };

  const _onRefresh = async () => {
    setRefreshing(true);
    ref.disableAdding = false;
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={contentContainerStyle}
        style={style}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={_renderFooter}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.01}
        refreshing={refreshing}
        ref={node => (ref.listView = node)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
      />
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
  data: PropTypes.array.isRequired,
};

export default memo(FetchList);
