import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';

import styles from './image.style';
import PropTypes from 'prop-types';

const Image: () => React$Node = (props, _ref) => {
  const {source = null, style = null, resizeMode = 'contain'} = props;

  let resize = FastImage.resizeMode.contain;

  switch (resizeMode) {
    case 'cover':
      resize = FastImage.resizeMode.cover;
      break;
    case 'center':
      resize = FastImage.resizeMode.center;
      break;
    case 'stretch':
      resize = FastImage.resizeMode.stretch;
      break;
  }

  return (
    <FastImage
      style={[styles.container, style]}
      source={source}
      resizeMode={resize}
    />
  );
};

Image.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object.isRequired,
  resizeMode: PropTypes.string,
};

export default memo(Image);
