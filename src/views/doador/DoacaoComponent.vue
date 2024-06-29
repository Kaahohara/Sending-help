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

    

    <div >

    <div class="form-doacao">
      <div class="box-form">
        <img class="lados-doacao" src="@/assets/roupa.png" alt="logo"/>
        <div class="lados-doacao back-whitegreen">
          <div class="doacao-container">
            <div v-if="!verificalogado()" class="aviso">
            Por favor, faça login para cadastrar sua doação.<br>
              <router-link to="/">Ir para a página de login</router-link>
            </div>
            <form @submit.prevent="registerDonation">
              {{ cadastroMessage }}
              <p class="subtitulo" style="color: white;">
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

     
      donationData: {
        tipo: '',
        cpf:'',
        STATUS:'Pendente',
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
      hasLogin: true,
      part2: false,
      loginData: {
        login: '',
        password: ''
      },
      registerData: {
        login: '',
        password: '',
        role: 'DONOR'
      },
      loginRegisterData:{
        login: '',
        password: ''
      },
      doadorData: {
        nomeCompleto: '',
        telefoneContato: '',
        cpf: '',
        dataNascimento:''
      },
      loginMessage: true,
      cadastroMessage: null
    };
  },
  
 
  methods: {
   
    verificalogado(){

      return !!localStorage.getItem('token');
    },

    toggleForm() {
      this.hasLogin = !this.hasLogin;
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
        
       
  
  }
   
  }

</script>
<style>
.aviso {
  color:red;
  padding: 10px;
  margin-bottom: 10px;
}
.aviso a{
  text-decoration: none;
  color: azure;
}
</style>
