import React, {memo, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';

import styles from './touch-zoom.style';

const TouchZoom: () => React$Node = (props, _ref) => {
  const ref = useRef({handleViewRef: null}).current;
  const {
    style = null,
    children = null,
    onPress = () => {},
    zoomSize = 0.9,
  } = props;

  const _onPressIn = async () => {
    await ref.handleViewRef.animate({0: {scale: 1}, 1: {scale: zoomSize}}, 300);
  };

  const _onPressOut = async () => {
    await ref.handleViewRef.animate({0: {scale: zoomSize}, 1: {scale: 1}}, 300);
  };

  return (
    <TouchableOpacity
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onPress={onPress}
      activeOpacity={1}>
      <View
        ref={node => (ref.handleViewRef = node)}
        style={[styles.container, style]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

TouchZoom.propTypes = {
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  zoomSize: PropTypes.number,
};

export default memo(TouchZoom);
