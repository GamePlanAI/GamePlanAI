import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AuthContext, useAuth } from '../contexts/AuthContext'

export default function VerificationScreen() {
  const { resendVerification, signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.text}>
        A verification link has been sent to your email. Please check your inbox.
      </Text>
      <Button title="Resend Email" onPress={resendVerification} />
      <Button title="Log Out" onPress={signOut} color="red" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title:     { fontSize: 24, marginBottom: 15 },
  text:      { fontSize: 16, marginBottom: 25, textAlign: 'center' },
})