// src/screens/HomeScreen.tsx

import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native'
import { AuthContext, useAuth } from '../contexts/AuthContext'

export default function HomeScreen() {
  const { signOut, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton} onPress={() => setMenuOpen(true)}>
              <Text style={styles.headerButtonText}>☰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={signOut}>
              <Text style={styles.headerButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome, {user?.email ?? 'Guest'}!</Text>
      </View>

      {/* Sidebar & Overlay */}
      {menuOpen && (
        <>
          <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.sidebar}>
            <View style={styles.sidebarMenu}>
              <View style={styles.sidebarRow}>
                <TouchableOpacity onPress={() => setMenuOpen(false)}>
                  <Text style={styles.sidebarCloseText}>☰</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Text style={styles.sidebarItemText}>GamePlan</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Calendar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>Grades</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                <Text style={styles.sidebarItemText}>NIL Assistant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeHeader: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 12,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: SCREEN_WIDTH * 0.7,
    width: SCREEN_WIDTH * 0.3,
    height: '100%',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.7,
    height: '100%',
    backgroundColor: '#333',
    paddingTop: 60,
    paddingHorizontal: 16,
    elevation: 8,
  },
  sidebarMenu: {
    marginTop: 10,
  },
  sidebarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarCloseText: {
    fontSize: 24,
    color: '#fff',
  },
  sidebarItem: {
    paddingVertical: 12,
  },
  sidebarItemText: {
    fontSize: 18,
    color: '#fff',
    paddingRight: 16,
  },
})
