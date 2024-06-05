<template>
  <div class="background">
    <div class="faixa">
      <p>O QUE DOAR?</p>
    </div>
    <div class="container-itens">
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/coberta.png">
          <p>Cobertores</p>
        </div>
      </div>
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/roupa.png">
          <p>Roupas</p>
        </div>
      </div>
    </div>
    <div class="container-itens">
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/higiene.png">
          <p>Itens de higiene</p>
        </div>
      </div>
      <div class="lados">
        <div class="box-itens">
          <img src="@/assets/alimentos.png">
          <p>Alimentos não perecíveis</p>
        </div>
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

    <div v-if="verificalogado()">

    <div class="form-doacao">
      <div class="box-form">
        <img class="lados-doacao" src="@/assets/roupa.png" alt="logo"/>
        <div class="lados-doacao back-whitegreen">
          <div class="doacao-container">
           
            <form @submit.prevent="registerDonation">
              {{ cadastroMessage }}
              <p class="subtitulo">
                Cadastre sua Doação
              </p>
              <div class="input-group-ong">
              <select  v-model="donationData.tipo" id="tipo" name="tipo" required>
                <option disabled value="">Selecione um tipo de doação</option>
                <option value="Alimentos">Alimentos não perecíveis</option>
                <option value="Cobertores">Cobertores</option>
                <option value="Roupas">Roupas</option>
                <option value="Higiene">Higiene</option>
              </select>
            </div>
            <div class="input-group-ong">
              <select v-model="donationData.endereco.cidade" id="cidade" name="cidade" required>
                <option disabled value="">Selecione uma cidade</option>
                <option value="Manaus">Manaus</option>
                <option value="Paraibinha">Paraibinhao</option>
                <option value="Santos">Santos</option>
              </select>
            </div>
            <div class="input-group-ong">
              <select v-model="donationData.endereco.estado" id="estado" name="estado" required>
                <option disabled value="">Selecione uma estado</option>
                <option value="Amazonas">Amazonas</option>
                <option value="Mato Grosso">Mato Grosso</option>
                <option value="RiodeJaneiro">Rio de Janeiro</option>
              </select>
            </div>

              <div class="input-group-ong">
                <input type="text" v-model="donationData.quantidade" id="quantidade" name="quantidade" placeholder="Quantidade" required>
              </div>
          
              <div class="input-group-ong">
                <input type="text" v-model="donationData.endereco.numero" id="numero" name="numero" placeholder="numero" required>
              </div>
              <div class="input-group-ong">
                <input type="text" v-model="donationData.endereco.bairro" id="Bairro" name="Bairro" placeholder="Bairro" required>
              </div>
              <div class="input-group-ong">
                <input type="text" v-model="donationData.endereco.rua" id="Rua" name="Rua" placeholder="Rua" required>
              </div>

              
              <button type="submit">Enviar</button>
            </form>
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
      doadorData:{
        name:'',
        phone:''
      },
  
      donationData: {
        tipo: '',
        cpf:'',
        previsao:{},
        emissao:{},
        quantidade: 0,
        endereco:{
        cep: '',
        estado: '',
        cidade: '',
        rua: '',
        bairro: '',
        numero: 0,
     
        }
      },
      loginMessage: true,
      cadastroMessage: null
    
    };
  },
  
 
  methods: {
   
    verificalogado(){
      return !!localStorage.getItem('token');
    },

   
    
    registerDonation() {
      if(this.donationData.endereco.cidade=='Amazonas'){
        this.donationData.endereco.estado='AM',
        this.donationData.endereco.cep='12345678'
      }else   
      if(this.donationData.endereco.cidade=='RiodeJaneiro'){
        this.donationData.endereco.estado='RJ',
        this.donationData.endereco.cep='44445678'
      }
      else{
        this.donationData.endereco.estado='MG',
        this.donationData.cep='876678'
      }
      this.donationData.emissao = new Date();
      this.donationData.previsao = new Date(this.donationData.emissao);
      this.donationData.previsao.setDate(this.donationData.emissao.getDate() + 7);

      if(this.donationData.quantidade<=0){
        this.cadastroMessage= "Dõe pelo menos 1 item";
      }else if(this.donationData.endereco.numero<=0){
        this.cadastroMessage= "Insira um número real";
      }else{
          const authToken = localStorage.getItem('token');
          this.donationData.cpf=localStorage.getItem('cpf');
          apiClient.post('/donation', this.donationData, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': `Bearer ${authToken}`
            }
          })
         .then(response=>{
          this.$router.push('/doador-doacao');
         })
          .catch(error => {
            if(error)
            this.cadastroMessage = 'Falha ao registrar a doação';
          });
        }},
        
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
    }},
    
    registerUser() {
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
          localStorage.setItem('cpf', primeiroDoador.cpf);
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

</script>
