import {Platform} from 'react-native';
const Colors = {
  main: '#EE7886',
  white: '#ffffff',
  black: '#333333',
  backgroundControlPanel: '#005D80',
  transparent: 'rgba(0 ,0, 0, 0)',
  baseShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 1.6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
};

export default Colors;
