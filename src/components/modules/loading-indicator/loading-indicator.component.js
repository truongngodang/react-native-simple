import React, {useState, useImperativeHandle, forwardRef, memo} from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './loading-indicator.style';

const LoadingIndicator: () => React$Node = (props, _ref) => {
  useImperativeHandle(_ref, () => ({show, dismiss}));
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const dismiss = () => {
    setVisible(false);
  };

  if (visible) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return null;
};

export default memo(forwardRef(LoadingIndicator));
