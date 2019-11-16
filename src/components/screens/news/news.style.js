import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../resources/colors';

export default ScaledSheet.create({
  wrapContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: '18@ms',
    color: '#3B3B3B',
    fontWeight: '700',
    textAlign: 'center',
  },
  wrapList: {
    paddingHorizontal: '16@ms',
    paddingVertical: '16@ms',
  },
  separator: {
    height: '15@ms',
  },
});
