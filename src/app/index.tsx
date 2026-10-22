import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router'; // 1. IMPORTANTE: Adicione a importação do Stack
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { authService } from '../services/authService';

export default function Index() {
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 2. IMPORTANTE: Esta linha abaixo desativa a barra do Expo Starter */}
      <Stack.Screen options={{ headerShown: false }} />

      {user ? (
        <ProfileScreen user={user} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLoginSuccess={(loggedInUser: any) => setUser(loggedInUser)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' }
});
