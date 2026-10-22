import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'https://api-mock-placeholder.com', // URL fictícia
});

api.interceptors.request.use(
  async (config) => {
    let accessToken = await authService.getAccessToken();
    const expiresAt = await authService.getExpiresAt();

    if (expiresAt && Date.now() >= Number(expiresAt)) {
      console.log("Access Token expirou! Acionando fluxo de Refresh...");
      try {
        accessToken = await authService.refreshTokens();
      } catch (error) {
        console.log("Falha no Refresh Token, necessário reautenticar.");
        await authService.logout();
        return Promise.reject(error);
      }
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log(`Requisição com: Bearer ${accessToken.substring(0, 25)}...`);
    }

    return Promise.reject({
      isMockSuccess: true,
      message: "Sucesso simulado localmente para o SENAI."
    });
  },
  (error) => Promise.reject(error)
);

export default api;
