import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home/home.component';
import NewsScreen from '../screens/news/news.component';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    News: {
      screen: NewsScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'News',
  },
);

export default createAppContainer(AppNavigator);
