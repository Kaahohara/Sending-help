<template>
  <div>
  <div class="fundoWood">
    <div class="frase">
      <p>
        Seja bem-vindo ao nosso site de doações para desastres naturais. Em tempos de crise, cada gesto de solidariedade faz uma enorme diferença. Junte-se a nós para apoiar comunidades afetadas por desastres ao redor do mundo.
      </p>
    </div>
  </div>

  <div class="green">
    <div class="box">
      <p class="titulo">SOS Mata Atlântica</p>
      <p>
        Por meio de projetos, campanhas e outras iniciativas, a Fundação monitora a qualidade da água com a ajuda de voluntários e busca o fortalecimento das leis que protegem nossos rios.
      </p>
    </div>
    <div class="box">
      <p class="titulo">OXFAM</p>
      <p>
        Contribuir para a construção de um Brasil justo, sustentável e solidário que elimine as causas da pobreza e da desigualdade. Trabalhamos com parceiros e aliados como parte de um movimento nacional e global pela transformação social.
      </p>
    </div>
    <div class="box">
      <p class="titulo">SOS Mata Atlântica</p>
      <p>Objetivos: texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo</p>
    </div>
  </div>

  <div class="container-image">
    <div class="box">
      <p class="titulo">SOS Mata Atlântica</p>
      <p>Objetivos: texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo</p>
    </div>
    <div class="box">
      <p class="titulo">SOS Mata Atlântica</p>
      <p>Objetivos: texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo</p>
    </div>
    <div class="box">
      <p class="titulo">SOS Mata Atlântica</p>
      <p>Objetivos: texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo texto de exemplo</p>
    </div>
  </div>

  <div v-if="!verificalogado()">
  <div class="form-box">
    <div class="box-form">
      <div class="lados back-green" style="display: flex; align-items: center; justify-content: center;">
        <img src="@/assets/logo.png" width="200px" alt="logo">
      </div>
      <div class="lados back-white">
          <div v-if="!hasLogin" class="cadastro-container">
            {{cadastroMessage}}
            <p class="subtitulo">CADASTRO</p>
            <form @submit.prevent="registerUser">
              <div class="input-group">
                <input type="text" v-model="doadorData.name" placeholder="Nome" required>
              </div>
              <div class="input-group">
                <input type="email" v-model="registerData.login" placeholder="Username" required>
              </div>
              <div class="input-group">
                <input type="password" v-model="registerData.password" placeholder="Password" required>
              </div>
              <div class="input-group">
                <input type="number" v-model="doadorData.phone" placeholder="Phone" required>
              </div>
          
              <button type="submit">Registrar</button>
            </form>
            <a @click="toggleForm">Já tem uma conta? Faça login</a>
          </div>
          <div v-else class="login-container">
           <div v-if="!loginMessage">Tente Novamente!</div>
            <p class="subtitulo">LOGIN</p>
            <form @submit.prevent="submitForm">
              <div class="input-group">
                <input type="email" v-model="loginData.login" placeholder="Username" required>
              </div>
              <div class="input-group">
                <input type="password" v-model="loginData.password" placeholder="Password" required>
              </div>
              <button type="submit">Login</button>
            </form>
          
            <a @click="toggleForm">Ainda não tem uma conta? Cadastre-se</a>
          </div>
        </div>
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
      hasLogin: true,
      loginData: {
        login: '',
        password: ''
      },
      registerData: {
        login: '',
        password: '',
        role: 'ADMIN'
      },
      doadorData:{
        name:'',
        phone:''
      },
      loginMessage: true,
      cadastroMessage: null
    };
  },

  methods: {
    verificalogado(){
      return !!localStorage.getItem('token');
    },

    submitForm() {
      axios.post('http://localhost:8090/auth/login', this.loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
      .then(response => {
        const authToken = response.data.token;
        localStorage.setItem('token', authToken);
        axios.get('http://localhost:8090/doadores', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(response => {
          this.loginMessage = null;
          const doadores = response.data.filter(doador => doador.email === this.loginData.login);
          if (doadores.length > 0) { 
            const primeiroDoador = doadores[0]; 
            localStorage.setItem('nome', primeiroDoador.name);
             window.location.reload();
          } else {
            this.loginMessage = false;
          }
        })
        .catch(error => {
          this.loginMessage = false;
        });
      })
      .catch(error => {
        this.loginMessage = false;
      });
    },
    
    registerUser() {
      axios.post('http://localhost:8090/auth/register', this.registerData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
      .then(response => {
       
        this.cadastroMessage = true;
        const authToken = response.data.token;
        const name = response.data.name;
        localStorage.setItem('token', authToken);
    
        this.doadorData.email = this.registerData.login;
        axios.post('http://localhost:8090/doadores', this.doadorData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('nome', this.doadorData.name);
          window.location.reload();

        })
        .catch(error => {
          
          this.cadastroMessage = 'Tente Novamente';
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          this.cadastroMessage = 'E-mail ja cadastrado'; 
          }else{
        this.cadastroMessage = 'Tente Novamente';
      }
    });
    },

    toggleForm() {
      this.hasLogin = !this.hasLogin;
    }
  }
}
</script>
