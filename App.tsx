// App.tsx
export type RootStackParamList = {
  Login:          undefined
  SignUp:         undefined
  ResetPassword:  undefined   // ← new
  Home:           undefined
  Verification:   undefined   // ← added
}

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext, AuthProvider } from './src/contexts/AuthContext'
import { useAuth } from './src/contexts/AuthContext';

import SignUpScreen       from './src/screens/SignUpScreen'
import LoginScreen        from './src/screens/LoginScreen'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen' // ← new
import HomeScreen         from './src/screens/HomeScreen'
import VerificationScreen from './src/screens/VerificationScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

function MainNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user && <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>}
        {user && !user.emailVerified && (
          <Stack.Screen name="Verification" component={VerificationScreen} />
        )}
        {user?.emailVerified && (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
