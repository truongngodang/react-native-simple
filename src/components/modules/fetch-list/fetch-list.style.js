import {ScaledSheet} from 'react-native-size-matters/extend';
import Colors from '../../../resources/colors';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.white,
    ...Colors.baseShadow,
    zIndex: 99,
  },
  inner: {
    height: '50@ms',
    flexDirection: 'row',
  },
  left: {
    height: '50@ms',
    width: '50@ms',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    height: '50@ms',
    width: '50@ms',
  },
});
