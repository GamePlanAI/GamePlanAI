// src/screens/SignUpScreen.tsx

import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'  // adjust path if needed
import { useAuth } from '../contexts/AuthContext'
import { sendEmailVerification } from 'firebase/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

export default function SignUpScreen({ navigation }: Props) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async () => {
    setError(null)
    try {
      const cred = await signUp(email.trim(), password)
      // send verification email:
     await sendEmailVerification(cred.user)
     // send them to the “please verify” page
      navigation.replace('Verification')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={styles.switchRow}>
        <Text>Already have an account?</Text>
        <Button title="Log In" onPress={() => navigation.replace('Login')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title:     { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input:     { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  error:     { color: 'red', marginBottom: 15, textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
})