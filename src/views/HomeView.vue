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
                <div class="input-group">
                  <input type="text" v-model="doadorData.cpf" placeholder="CPF" required>
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
import apiClient from '@/axios';

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
      doadorData: {
        name: '',
        phone: '',
        cpf: ''
      },
      loginMessage: true,
      cadastroMessage: null
    };
  },

  methods: {
    validarCPF(cpf) {
      cpf = String(cpf).replace(/[^\d]+/g, '');
      if (cpf === '') return false;

      if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;

      let add = 0;
      for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev === 10 || rev === 11)
        rev = 0;
      if (rev !== parseInt(cpf.charAt(9)))
        return false;

      add = 0;
      for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev === 10 || rev === 11)
        rev = 0;
      if (rev !== parseInt(cpf.charAt(10)))
        return false;

      return true;
    },
    verificalogado() {
      return !!localStorage.getItem('token');
    },

    submitForm() {
      apiClient.post('/auth/login', this.loginData, {
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

          apiClient.get('/doadores', {
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
                localStorage.setItem('cpf', primeiroDoador.cpf);
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
      if (!this.validarCPF(this.doadorData.cpf)) {
        this.cadastroMessage = 'CPF inválido';
        return;
      }
      apiClient.post('/auth/register', this.registerData, {
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
          apiClient.post('/doadores', this.doadorData, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': `Bearer ${authToken}`
            }
          })
            .then(response => {
              localStorage.setItem('nome', this.doadorData.name);
              
              localStorage.setItem('cpf', this.doadorData.cpf);
              window.location.reload();
            })
            .catch(error => {
              this.cadastroMessage = 'Tente Novamente';
            });
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            this.cadastroMessage = 'E-mail já cadastrado';
          } else {
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
