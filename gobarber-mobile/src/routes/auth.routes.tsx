import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312238' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={{ ...TransitionPresets.SlideFromRightIOS }}
    />
  </Auth.Navigator>
);

export default AuthRoutes;
