// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './SRC/Screens/WelcomeScreen';
import PhoneVerification from './SRC/Screens/PhoneVerification';
import OtpVerification from './SRC/Screens/OtpVerification';
import ProfileCompletion from './SRC/Screens/ProfileCompletion';
import DeliveryAddress from './SRC/Screens/DeliveryAddress';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Phone Number Verification" component={PhoneVerification} />
        <Stack.Screen name="OTP Verification" component={OtpVerification} />
        <Stack.Screen name="ProfileCompletion" component={ProfileCompletion} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
