<template>
  <div class="form-box">
    <div class="box-form">
      <div class="lados back-green" style="display: flex; align-items: center; justify-content: center;">
        <img src="@/assets/logo.png" width="200px" alt="logo">
      </div>
      <div class="lados back-white">
        <div class="login-container">
          <p class="subtitulo">LOGIN</p>
          <form @submit.prevent="submitForm">
            <div class="input-group">
              <input type="text" v-model="loginData.username" placeholder="Username" required>
            </div>
            <div class="input-group">
              <input type="password" v-model="loginData.password" placeholder="Password" required>
            </div>
            <button type="submit">Login</button>
          </form>
          <a>Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Enviar os dados do formulário para o backend
      axios.post('http://localhost:8090/auth/login', this.loginData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        })
        .then(response => {
          // Manipular a resposta do backend (por exemplo, armazenar o token de autenticação)
          console.log('Token de autenticação:', response.data.token);
          // Redirecionar para outra página, atualizar o estado do aplicativo, etc.
        })
        .catch(error => {
          // Manipular os erros de solicitação
          console.error('Erro ao fazer login:', error);
        });
    }
  }
}
</script>
