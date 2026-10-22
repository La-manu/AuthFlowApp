import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { authService } from '../services/authService';

interface LoginProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginProps) {
  // Alterado para começar com strings vazias
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage('');
      console.log("Iniciando tentativa de login...");
      const response = await authService.login(email, password);
      
      if (response && response.success) {
        console.log("Sucesso!");
        onLoginSuccess(response.user);
      }
    } catch (error: any) {
      console.log("Erro capturado:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SENAI-SP</Text>
        <Text style={styles.subtitle}>AuthFlow App - Grupo 1</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="E-mail corporativo" 
          placeholderTextColor="#999"
          value={email} 
          onChangeText={(text) => { setEmail(text); setErrorMessage(''); }} 
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Senha de acesso" 
          placeholderTextColor="#999"
          value={password} 
          onChangeText={(text) => { setPassword(text); setErrorMessage(''); }} 
          secureTextEntry
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3e8ff' },
  card: { width: '85%', backgroundColor: '#fff', padding: 25, borderRadius: 16, shadowColor: '#6b21a8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#6b21a8', marginBottom: 2 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#a855f7', marginBottom: 25, fontWeight: '500' },
  input: { backgroundColor: '#f9f5ff', padding: 14, borderRadius: 8, marginBottom: 14, borderWidth: 1, borderColor: '#e9d5ff', color: '#4c1d95', fontSize: 15 },
  errorText: { color: '#dc2626', fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 12, backgroundColor: '#fee2e2', padding: 8, borderRadius: 6 },
  button: { backgroundColor: '#7c3aed', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
