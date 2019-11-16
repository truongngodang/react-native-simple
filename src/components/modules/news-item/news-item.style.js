import {ScaledSheet} from 'react-native-size-matters/extend';
import Colors from '../../../resources/colors';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: '120@ms',
    height: '80@ms',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  body: {
    flex: 1,
    paddingLeft: '15@ms',
  },
  title: {
    color: Colors.black,
    fontSize: '14@ms',
    lineHeight: '19@ms',
    fontWeight: '700',
  },
  content: {
    color: '#666',
    fontSize: '12@ms',
    lineHeight: '16@ms',
    marginTop: '5@ms',
  },
});
