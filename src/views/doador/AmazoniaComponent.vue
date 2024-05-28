<template>
  <div>
  <div class="filtro">
    <div class="categorias">
      <router-link to="/doador-ong-amazonia">
        <Doador-ong-amazonia />
        <img src="@/assets/Amazonia.png" alt="amazonia" />
        <p>Amazônia</p>
      </router-link>
      <router-link to="/doador-ong-riojaneiro">
        <Doador-ong-riojaneiro />
        <img src="@/assets/RioJaneiro.png" alt="RioJaneiro" />
        <p>Rio de Janeiro</p>
      </router-link>
      <router-link to="/doador-ong-matogrosso">
        <Doador-ong-matogrosso />
        <img src="@/assets/MatoGrosso.png" alt="MatoGrosso" />
        <p>Mato Grosso</p>
      </router-link>
    </div>
  </div>


      <div class="containerong">
        <div v-for="ong in filteredOngs" :key="ong.id" class="containerong-item">
        <div class="picture">
          <img src='@/assets/Amazonia.png' alt="ongimage">
        </div>
        <div class="nameong">
          <p>{{ ong.nome }}</p>
          <p>Objetivos: {{ ong.cause }}</p>
        </div>
      </div>
    </div>
  <div v-if="!verificalogado()" class="form-box">
          <div v-if="!hasLogin" >
           
            
            <form @submit.prevent="registerUser">
              <p style="color: red; font-size: large; text-align: center;">{{cadastroMessage}}</p>
        <div class="ong-container">
         <div class="lados">
            <img src="@/assets/profile.png" style="margin: auto" height="60%" width="80%" alt="profile">
            <div class="input-group-ong">
              <input type="text" v-model="ongData.nome" id="nome" name="nome" placeholder="Nome da ONG:" required>
            </div>
            <div class="input-group-ong">
              <input type="tel" v-model="ongData.telefone" id="telefone" name="telefone" placeholder="Telefone:" required>
            </div>
          </div>

          <div class="lados">
            <div class="input-group-ong">
              <input type="number" v-model="ongData.cnpj" id="cnpj" name="cnpj" placeholder="CNPJ:" required>
            </div>
            <div class="input-group-ong">
              <input type="email" v-model="ongData.login" id="login" name="login" placeholder="Email:" required>
            </div>
            <div class="input-group-ong">
              <input type="password" v-model="registerData.password" id="password" name="password" placeholder="Senha:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" v-model="ongData.cause" id="cause" name="cause" placeholder="Causa:" required>
            </div>
            <div class="input-group-ong">
          <select v-model="ongData.endereco.cidade" id="cidade" name="cidade" required>
            <option disabled value="">Selecione uma cidade</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Mato Grosso">Mato Grosso</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
          </select>
        </div>

            <div class="input-group-ong">
              <input type="text" v-model="ongData.endereco.rua" id="rua" name="rua" placeholder="Rua:" required>
            </div>
            <div class="input-group-ong">
              <input type="number" v-model="ongData.endereco.numero" id="numero" name="numero" placeholder="Número:" required>
            </div>
            <div class="input-group-ong">
              <input type="text"  v-model="ongData.endereco.bairro" id="bairro" name="bairro" placeholder="Bairro:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" v-model="ongData.endereco.cep" id="cep" name="cep" placeholder="CEP:" required>
            </div>
          
            <button type="submit">Registrar</button>
          <br>
            <a  style="color: aliceblue;" @click="toggleForm">Já tem uma conta? Faça login</a>
          </div>
        </div>
      </form>
    </div>

      <div v-if="hasLogin" >
    <div class="box-form">
      <div class="lados back-green" style="display: flex; align-items: center; justify-content: center;">
        <img src="@/assets/logo.png" width="200px" alt="logo">
      </div>
      <div class="lados back-white">
      <div  class="login-container">
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
  
  <div class="cont">
    <div class="lados">
      <img src="@/assets/logo.png" width="200px" alt="logo">
    </div>
    <div class="lados">
      <p>
        Site de doações para desastres naturais. Em tempos de crise, cada gesto de solidariedade faz uma enorme diferença. Junte-se a nós para apoiar comunidades afetadas por desastres ao redor do mundo.
      </p>
    </div>
    <div class="lados">
      <p>E-mail:Centro@gmail.com</p>
      <p>Telefone:55 98783-46655</p>
      <div class="icons">
        <div class="lados">
          <img src="@/assets/whats.png" alt="whatsapp">
        </div>
        <div class="lados">
          <img src="@/assets/instagram.png" alt="instagram">
        </div>
        <div class="lados">
          <img src="@/assets/facebook.png " alt="facebook">
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
      ongData: {
        nome: '',
        cnpj: '',
        telefone: '',
        login:'',
        cause: '',
        endereco:{
        cep: '',
        cidade: '',
        rua: '',
        bairro: '',
        numero: ''
        }
      },
      registerData: {
        login: '',
        password: '',
        role: 'ADMIN'
      },
      ongs: [],
      loginMessage: true,
      cadastroMessage: null
    };
  },
  computed: {
    filteredOngs() {
      return this.ongs.filter(ong => ong.endereco && ong.endereco.cidade === 'Amazonas');
    }
  },
  mounted() {
    this.fetchOngs();
  },
  methods: {
    verificalogado(){
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
        const authToken = response.data.token;
        localStorage.setItem('token', authToken);
       
        apiClient.get('/ong', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(response => {
          this.loginMessage = null;
          const ONGS = response.data.filter(ong => ong.login === this.loginData.login);
          if (ONGS.length > 0) { 
            const primeiraONG = ONGS[0]; 
            localStorage.setItem('nome', primeiraONG.nome);
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
  this.registerData.login = this.ongData.login;

  apiClient.get(`/ong/${this.ongData.cnpj}`)
    .then(response => {
      if (response.data.length === 0) {
        apiClient.post('/auth/register', this.registerData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        })
        .then(response => {
          const authToken = response.data.token;
          localStorage.setItem('nome', this.ongData.nome);
          localStorage.setItem('token', authToken);

          apiClient.post('/ong', this.ongData, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': `Bearer ${authToken}`
            }
          })
          .then(response => {
            window.location.reload();
          })
          .catch(error => {
            this.cadastroMessage = 'Falha ao registrar na ONG';
          });
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            this.cadastroMessage = 'E-mail ou CNPJ já cadastrado'; 
          } else {
            this.cadastroMessage = 'Falha ao registrar';
          }
        });
      } else {
        this.cadastroMessage = 'CNPJ já cadastrado';
      }
    })
    .catch(error => {
      this.cadastroMessage = 'Falha ao verificar CNPJ';
    });
  
},
fetchOngs() {
      apiClient.get('/ong', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
      .then(response => {
        this.ongs = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar ONGs:', error);
      });
    },
    getOngImage(ong) {
    
      return  '@/assets/Amazonia.png';
    },
    toggleForm() {
      this.hasLogin = !this.hasLogin;
    }
  }
}
</script>