// src/screens/ResetPasswordScreen.tsx

import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native'
import { AuthContext, useAuth } from '../contexts/AuthContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>

export default function ResetPasswordScreen({ navigation }: Props) {
  const { signOut, user } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    setError(null)
    try {
      await resetPassword(email.trim())
      Alert.alert(
        'Password Reset',
        'If that email is registered, you’ll receive a reset link shortly.'
      )
      navigation.replace('Login')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Button title="Send Reset Link" onPress={handleReset} />

      <View style={styles.switchRow}>
        <Button
          title="Back to Login"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title:     { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input:     { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  error:     { color: 'red', marginBottom: 15, textAlign: 'center' },
  switchRow: { marginTop: 20, alignItems: 'center' },
})
