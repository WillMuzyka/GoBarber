import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312E38' },
    }}
  >
    {/* Appointments */}
    <App.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ ...TransitionPresets.SlideFromRightIOS }}
    />
    <App.Screen
      name="CreateAppointment"
      component={CreateAppointment}
      options={{ ...TransitionPresets.SlideFromRightIOS }}
    />
    <App.Screen
      name="AppointmentCreated"
      component={AppointmentCreated}
      options={{ ...TransitionPresets.SlideFromRightIOS }}
    />

    {/* Profile */}
    <App.Screen
      name="Profile"
      component={Profile}
      options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    />
  </App.Navigator>
);

export default AppRoutes;
