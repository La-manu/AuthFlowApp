import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const MOCK_USER = { email: 'senai@sp.com.br', password: '123' };

const saveStorage = async (key, value) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getStorage = async (key) => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const deleteStorage = async (key) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await deleteStorage('access_token');
  }
};

export const authService = {
  login: async (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const accessToken = "mock_access_token_" + Date.now();
      const refreshToken = "mock_refresh_token_" + Date.now();
      const expiresAt = Date.now() + 10000; // Expira em 10 segundos para teste

      await saveStorage('access_token', accessToken);
      await saveStorage('refresh_token', refreshToken);
      await saveStorage('expires_at', String(expiresAt));

      return { success: true, user: { name: 'Aluno SENAI', email } };
    }
    // Mensagem de erro segura alterada aqui:
    throw new Error('E-mail ou senha incorretos.');
  },

  refreshTokens: async () => {
    const currentRefreshToken = await getStorage('refresh_token');
    if (!currentRefreshToken) throw new Error('Sem refresh token salvo');

    console.log("Servidor Mock: Renovando tokens com o:", currentRefreshToken);

    const newAccessToken = "new_access_token_" + Date.now();
    const newRefreshToken = "new_refresh_token_" + Date.now();
    const newExpiresAt = Date.now() + 10000;

    await saveStorage('access_token', newAccessToken);
    await saveStorage('refresh_token', newRefreshToken);
    await saveStorage('expires_at', String(newExpiresAt));

    return newAccessToken;
  },

  logout: async () => {
    await deleteStorage('access_token');
    await deleteStorage('refresh_token');
    await deleteStorage('expires_at');
  },

  getAccessToken: () => getStorage('access_token'),
  getExpiresAt: () => getStorage('expires_at'),
};
