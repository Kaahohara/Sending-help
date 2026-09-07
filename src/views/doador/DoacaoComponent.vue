<template>
  <UnderlineTitle title="O que " description="Doe ...." underlineText="doar?" />
  <GalleryGrid></GalleryGrid>
  <FormCard buttonText="Enviar" title="Cadastrar doações">
    <div>
      <label for="tipo" class="block mb-1.5 text-sm font-medium text-slate-700">Tipo de Doação</label>
      <select v-model="donationData.tipo" id="tipo" required 
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm outline-none transition-all">
        <option disabled value="">Selecione um tipo de doação</option>
        <option value="Alimentos">Alimentos não perecíveis</option>
        <option value="Cobertores">Cobertores</option>
        <option value="Roupas">Roupas</option>
        <option value="Higiene">Higiene</option>
      </select>
    </div>

    <!-- Cidade -->
    <div>
      <label for="cidade" class="block mb-1.5 text-sm font-medium text-slate-700">Cidade</label>
      <select v-model="donationData.endereco.cidade" id="cidade" required 
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm outline-none transition-all">
        <option disabled value="">Selecione uma cidade</option>
        <option value="Manaus">Manaus</option>
        <option value="Paraibinha">Paraibinha</option>
        <option value="Santos">Santos</option>
      </select>
    </div>

    <!-- Estado -->
    <div>
      <label for="estado" class="block mb-1.5 text-sm font-medium text-slate-700">Estado</label>
      <select v-model="donationData.endereco.estado" id="estado" required 
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm outline-none transition-all">
        <option disabled value="">Selecione um estado</option>
        <option value="Amazonas">Amazonas</option>
        <option value="Mato Grosso">Mato Grosso</option>
        <option value="Rio de Janeiro">Rio de Janeiro</option>
      </select>
    </div>

    <!-- Quantidade -->
    <div>
      <label for="quantidade" class="block mb-1.5 text-sm font-medium text-slate-700">Quantidade</label>
      <input type="text" v-model="donationData.quantidade" id="quantidade" placeholder="Ex: 5 caixas / 10 kg" required 
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
    </div>

    <!-- Grid para Endereço -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="rua" class="block mb-1.5 text-sm font-medium text-slate-700">Rua</label>
        <input type="text" v-model="donationData.endereco.rua" id="rua" placeholder="Nome da rua" required 
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
      </div>
      <div>
        <label for="numero" class="block mb-1.5 text-sm font-medium text-slate-700">Número</label>
        <input type="text" v-model="donationData.endereco.numero" id="numero" placeholder="Nº" required 
          class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
      </div>
    </div>

    <div>
      <label for="bairro" class="block mb-1.5 text-sm font-medium text-slate-700">Bairro</label>
      <input type="text" v-model="donationData.endereco.bairro" id="bairro" placeholder="Nome do bairro" required 
        class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
    </div>
  </FormCard>
<FooterCard />
</template>
<script setup>
  import UnderlineTitle from '@/components/UnderlineTitle.vue';
</script>
<script>
import apiClient from '@/axios';
import GalleryGrid from '@/components/GalleryGrid.vue';
import FormCard from '@/components/FormCard.vue';
import FooterCard from '@/components/FooterCard.vue';

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
