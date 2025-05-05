// src/screens/LoginScreen.tsx

import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { AuthContext, useAuth } from '../contexts/AuthContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    try {
      await signIn(email.trim(), password)
      navigation.replace('Home')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GamePlanAI Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />

      {/* — Sign Up Prompt — */}
      <Text style={styles.prompt}>Don’t have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />

      {/* — Forgot Password — */}
      <Text style={styles.prompt}>Forgot your password?</Text>
      <Button
        title="Reset Password"
        onPress={() => navigation.navigate('ResetPassword')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title:     { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input:     { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  error:     { color: 'red', marginBottom: 15, textAlign: 'center' },
  prompt:    { marginTop: 20, textAlign: 'center' },
})