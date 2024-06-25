<template>
  <div>
    <div class="container-entrega">
      <div class="box-entrega" v-for="donation in donations" :key="donation.id">
        <p>Tipo da Entrega: {{ donation.tipo }}</p>
        <p><strong>Endereço: {{ donation.endereco.rua }}, nº {{ donation.endereco.numero }}, {{ donation.endereco.cidade }}, cep: {{ donation.endereco.cep }}</strong></p>
        <p><strong>Status:</strong> {{ donation.status }}</p>
        <button @click="updateStatus(donation.id)">Atualizar Status</button>
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
        <p>E-mail: Centro@gmail.com</p>
        <p>Telefone: 55 98783-46655</p>
        <div class="icons">
          <div class="lados">
            <img src="@/assets/whats.png" alt="whatsapp">
          </div>
          <div class="lados">
            <img src="@/assets/instagram.png" alt="instagram">
          </div>
          <div class="lados">
            <img src="@/assets/facebook.png" alt="facebook">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiClient from '@/axios';
const authToken = localStorage.getItem('token');
    
export default {
  data() {
    return {
      donations: []  
    };
  },
  mounted() {
    this.verificalogado(); // Call the method to verify login status
    this.fetchDonations(); 
  },
  methods: {
    verificalogado() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/');
      } else {
        return true;
      }
    },
    fetchDonations() {  
      apiClient.get('/donation', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        this.donations = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar doações:', error);
      });
    },
    updateStatus(id) {
      apiClient.get(`/doador/${localStorage.getItem('cpf')}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }   
      })
      .then(response => {
        const donation = this.donations.find(d => d.id === id);
        apiClient.post('/entrega', { 
          pontoColeta: response.data.pontoColeta,
          coletorCpf: response.data.cpf,
          doacaoCodigo: donation.id,
          horarioRetirada: new Date(),
          horarioFinalizacao: new Date(),
          doadorCpf: donation.cpf,
          enderecoRetirada: {
            cep: donation.endereco.cep,
            estado: donation.endereco.estado,
            rua: donation.endereco.rua,
            bairro: donation.endereco.bairro,
            numero: donation.endereco.numero
          }
        }, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(response => {
          this.$router.push('/doador-doacao');
        })
        .catch(error => {
          console.error('Erro ao atualizar status:', error);
          // Handle error as needed
        });
      })
      .catch(error => {
        console.error('Erro ao obter pessoa:', error);
        // Handle error as needed
      });
    }
  }
}
</script>
