import React, {memo} from 'react';
import {View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import styles from './header-bar.style';

const HeaderBar: () => React$Node = (props, _ref) => {
  const insets = useSafeArea();
  const {
    renderLeft = null,
    renderCenter = null,
    renderRight = null,
    style = null,
  } = props;
  return (
    <View style={[styles.container, {paddingTop: insets.top}, style]}>
      <View style={styles.inner}>
        <View style={styles.left}>{renderLeft}</View>
        <View style={styles.center}>{renderCenter}</View>
        <View style={styles.right}>{renderRight}</View>
      </View>
    </View>
  );
};

export default memo(HeaderBar);
