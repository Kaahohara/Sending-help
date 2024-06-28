<template>
    <div>
  
      <div class="containerong" >
          <div v-for="donation in filteredDonation" :key="donation.id" class="containerong-item" :style="{ backgroundColor: donation.status === 'CANCELADA' ? 'red' : '' }">
          <div class="picture">
            <img src='@/assets/Amazonia.png' alt="ongimage">
          </div>
          <div class="nameong">
            <p>Tipo: {{ donation.tipo }}</p>
            <p>Quantidade: {{ donation.nome }}  {{ donation.quantidade }}</p>
            <p> Pedido feito no dia:{{ donation.emissao }}</p>
            <p>Previsão:{{ donation.previsao }}</p>
            <p>Endereço:{{ donation.endereco.rua }}, nº {{ donation.endereco.numero }}, {{ donation.endereco.cidade }}, cep: {{ donation.endereco.cep }}.  </p>
            <p>Status:{{ donation.status }}</p>
            <div v-if="donation.status!='CANCELADA'">
            <button style="background-color: red;" @click="updateStatus(donation.codigo)">Cancelar</button>
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
        donation: []
      };
    },
   
    computed: {
      
      filteredDonation() {
        return this.donation.filter(donation => donation.cpf && donation.cpf === localStorage.getItem('cpf'));
      }
    },
    mounted() {
      this.fetchDonation();
    },
    methods: {
      updateStatus(id) {
        const authToken = localStorage.getItem('token'); 
      apiClient.put(`/donation/${id}`, {
        "status": "CANCELADA"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        donation.status = newStatus;
      })
      .catch(error => {
        console.error('Erro ao atualizar status:', error);
      });
    },
      verificalogado(){
      if ((!localStorage.getItem('token'))) {
      this.$router.push('/');
    }else{
      return !!localStorage.getItem('token');
    }},
  
   
          
     
      fetchDonation() {
  const authToken = localStorage.getItem('token'); 
  const cpf= localStorage.getItem('cpf'); 
apiClient.get(`/donation?cpf=${cpf}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(response => {
    
    this.donation = response.data;
  })
  .catch(error => {
    console.error('Erro ao buscar doações:', error);
  });
},

      toggleForm() {
        this.hasLogin = !this.hasLogin;
      }
    }
  }
  </script>