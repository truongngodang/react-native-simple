import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  memo,
} from 'react';
import {View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';

import styles from './test-popup.style';

const TestPopup: () => React$Node = (props, _ref) => {
  useImperativeHandle(_ref, () => ({show, dismiss}));
  const ref = useRef({resolve: null}).current;
  const [visible, setVisible] = useState(false);

  const show = () => {
    return new Promise(resv => {
      ref.resolve = resv;
      setVisible(true);
    });
  };

  const dismiss = () => {
    return new Promise(resv => {
      setVisible(false);
      ref.resolve = resv;
    });
  };

  const _onShow = () => {
    if (ref.resolve !== null) {
      ref.resolve();
      ref.resolve = null;
    }
  };

  const _onDismiss = () => {
    if (ref.resolve !== null) {
      ref.resolve();
      ref.resolve = null;
    }
  };

  return (
    <Modal
      isVisible={visible}
      onModalHide={_onDismiss}
      onModalShow={_onShow}
      backdropOpacity={0.8}
      useNativeDriver
      style={styles.container}
      hideModalContentWhileAnimating>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Test Popup</Text>
        <Text style={styles.content}>Test Popup</Text>
        <Button title="Close" onPress={dismiss} />
      </View>
    </Modal>
  );
};

export default memo(forwardRef(TestPopup));
