import React, {memo} from 'react';
import {View, Text} from 'react-native';

import styles from './news-item.style';
import PropTypes from 'prop-types';
import TouchZoom from '../touch-zoom';
import Image from '../image';

const NewsItem: () => React$Node = (props, _ref) => {
  const {style = null, data = null, onPress = () => {}} = props;
  return (
    <TouchZoom onPress={onPress} zoomSize={0.98}>
      <View style={[styles.container, style]}>
        <Image
          source={{uri: data.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>
            {data.name}
          </Text>
          <Text style={styles.content} numberOfLines={3}>
            {data.desc}
          </Text>
        </View>
      </View>
    </TouchZoom>
  );
};

NewsItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default memo(NewsItem);
