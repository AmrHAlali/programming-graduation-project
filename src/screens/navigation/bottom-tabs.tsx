import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './home-stack-navigator';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
    </Tab.Navigator>
  );
}