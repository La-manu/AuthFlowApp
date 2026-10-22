import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import { authService } from '../services/authService';

interface ProfileProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

export default function ProfileScreen({ user, onLogout }: ProfileProps) {
  const [logConsole, setLogConsole] = useState('Aguardando ação no console...');

  const fetchProtectedData = async () => {
    try {
      setLogConsole("Enviando requisição via Axios...");
      await api.get('/user/profile');
    } catch (error: any) {
      if (error && error.isMockSuccess) {
        setLogConsole("Requisicao completada com sucesso!\n\nVerifique o terminal do VS Code para ver o Token exato que o Interceptor injetou no Header.");
      } else {
        setLogConsole("Falha na requisicao real de rede.");
      }
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá, {user.name}!</Text>
        <Text style={styles.sub}>{user.email}</Text>
      </View>
      
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Console do Interceptor JWT:</Text>
        <Text style={styles.consoleText}>{logConsole}</Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#7c3aed' }]} onPress={fetchProtectedData}>
        <Text style={styles.buttonText}>Testar Rota Protegida</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: '#db2777', marginTop: 12 }]} onPress={onLogout}>
        <Text style={styles.buttonText}>Sair da Conta (Logout)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#f3e8ff' },
  header: { alignItems: 'center', marginBottom: 30 },
  welcome: { fontSize: 26, fontWeight: 'bold', color: '#4c1d95' },
  sub: { fontSize: 15, color: '#7c3aed', marginTop: 4 },
  box: { backgroundColor: '#1e1b4b', padding: 18, borderRadius: 12, marginBottom: 25, borderWidth: 1, borderColor: '#4338ca' },
  boxTitle: { color: '#a78bfa', fontSize: 12, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  consoleText: { color: '#34d399', fontFamily: 'monospace', fontSize: 13, lineHeight: 18 }, // <-- A vírgula foi adicionada aqui!
  button: { padding: 14, borderRadius: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
