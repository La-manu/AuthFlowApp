## Projeto: AuthFlow App - Autenticação Segura JWT & Refresh Token
## Integrantes: 
# Amanda Nº 03; 
# Ana Julia Thimote Nº 04;  
# Isabele Nº 10; 
# Layra Nº 15.
## Turma: DEV-2-OCZ

## Este projeto é uma Prova de Conceito (PoC) desenvolvida como atividade prática para a disciplina de Programação para Dispositivos Móveis (PPDM) no SENAI-SP. O objetivo principal é demonstrar o fluxo de autenticação resiliente utilizando JSON Web Tokens (JWT) e o ciclo de vida do Refresh Token em um ambiente mobile utilizando React Native e Expo.

Escopo do Desafio (Grupo 1)

• Desenvolvimento de telas de Login e Perfil Protegido.
• Simulação de recebimento de Access Token e Refresh Token via servidor mockado.
• Injeção automática do JWT no cabeçalho Authorization: Bearer <token> em rotas protegidas.
• Simulação de renovação automática e invisível (Refresh Token) quando o Access Token expira.

## 📱 CT1: Arquitetura e Características da Plataforma Mobile
Este projeto foi desenvolvido considerando o funcionamento de celulares e tablets. Como a internet móvel pode oscilar, o aplicativo foi projetado para ser resiliente. Isso significa que ele usa telas de loading enquanto carrega os dados e possui um limite de tempo (timeout) nas requisições. Se a conexão cair, o app não trava e lida com a falha de forma segura para o usuário.

## ⚙️ CT3: Interpretação de Requisitos do Sistema
As necessidades do projeto foram transformadas em regras técnicas, focando principalmente na segurança:
* Requisitos Funcionais e Não-Funcionais: Definem o que o app faz e como ele garante um bom desempenho.
* Segurança: Para o usuário entrar no app com segurança, foi usado o sistema de tokens JWT. As informações confidenciais não ficam expostas, pois são guardadas no celular de forma criptografada usando o SecureStore. Além disso, os dados que viajam pela internet utilizam o protocolo seguro HTTPS, e as chaves de acesso ficam escondidas em arquivos .env.

## 📈 CS2: Fundamentação Técnica e Pensamento Analítico
A escolha dessas tecnologias foi feita de forma analítica para resolver problemas reais de aplicativos móveis. Celulares mudam de rede o tempo todo e guardam dados sensíveis. Ao juntar o SecureStore para proteger os dados locais e o HTTPS para proteger os dados na internet, o projeto resolve os riscos de roubo de informações e garante um aplicativo robusto e seguro.


## Tecnologias e Bibliotecas Utilizadas

• React Native / Expo Go: Framework para construção da aplicação mobile nativa.
• Axios: Cliente HTTP utilizado para gerenciar as requisições e aplicar Interceptors.
• Expo Secure Store: Módulo de armazenamento criptografado no dispositivo, garantindo que os tokens fiquem salvos no Keychain (iOS) ou Keystore (Android).


## Funcionamento do Ciclo de Vida dos Tokens na Apresentação

Para fins de validação em sala de aula, o servidor mock foi configurado com um tempo de expiração do Access Token propositalmente curto (10 segundos). O fluxo ocorre da seguinte forma:
1. Login: O usuário entra com as credenciais válidas. O app armazena o access_token, refresh_token e o timestamp expires_at de forma segura.
2. Primeira Requisição: Ao clicar em "Testar Rota Protegida", o interceptor valida o tempo de expiração. Como o token está válido, ele envia a requisição anexando o cabeçalho HTTP de autorização.
3. Expiração e Renovação Automática: Passados 10 segundos, ao clicar no botão novamente, o Interceptor do Axios detecta que o token expirou no dispositivo. Ele pausa a requisição atual, dispara uma chamada em background para renovar o token e, após receber o novo par de chaves, refaz a requisição original com sucesso. Tudo isso acontece sem que o usuário seja deslogado.


# Como Executar o Projeto


## Pré-requisitos

• Node.js instalado na máquina.
• Aplicativo Expo Go instalado no seu smartphone Android ou iOS.

## Passo a Passo no Terminal

1. Clonar o Repositório:
bash
git clone https://github.com/La-manu/AuthFlow.git
cd NOME_DO_REPOSITORIO
Use o código com cuidado.
1. Instalar Dependências:
bash
npm install
Use o código com cuidado.
1. Iniciar o Servidor Expo:
bash
npx expo start
Use o código com cuidado.
1. Executar no Celular:
• Certifique-se de que o computador e o celular estão na mesma rede Wi-Fi.
• Escaneie o QR Code gerado no terminal usando o app Expo Go (Android) ou a Câmera nativa (iOS).


