<template>
  <div>
    <div class="container-entrega" v-if="donations.length">
      <div class="box-entrega" v-for="donation in donations" :key="donation.codigo"  :style="{ backgroundColor: getBackgroundColor(donation.status) }">
        <p>Tipo da Entrega: {{ donation.tipo }}</p>
        <p><strong> Endereço: {{ donation.endereco.rua }}, nº {{ donation.endereco.numero }}, {{ donation.endereco.cidade }}, cep: {{ donation.endereco.cep }}. </strong></p>
        <p><strong>Status:</strong> {{ donation.status }}</p>
        <button @click="updateStatus(donation.codigo)">Atualizar Status</button>
      </div>
    </div>
    <div v-else class="no-deliveries">
      Nenhuma entrega encontrada.
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
    this.fetchDonations();
  },
  computed:{
    containerClass() {
      return {
        'container-entrega': true,
        'container-coletada': this.donations.some(donation => donation.status === 'COLETADA')
      };
  }}
  ,
  methods: {
    getBackgroundColor(status) {
      if (status === 'COLETADA') {
        return 'blue';
      } else if (status === 'CANCELADA') {
        return 'red';
      } else if (status === 'FINALIZADA') {
        return '#D9D9D9 ';
      } else {
        return 'green'; 
      }
    }
  ,
    verificalogado() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/');
      } else {
        return !!localStorage.getItem('token');
      }
    },
    fetchDonations() {
      apiClient.get('/donation', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
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
      const donation = this.donations.find(d => d.codigo === id);
      if (!donation) {
        console.error(`Doação com ID ${id} não encontrada.`);
        return;
      }
      const newStatus = donation.status === 'PENDENTE' ? 'COLETADA' : 'FINALIZADA';

      apiClient.put(`/donation/${id}`, {
        "status": newStatus
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
    }
  }
}
</script>
<style>
.no-deliveries {
  height: 500px;
  text-align: center;
  color: red;
  font-size: 28px;
}
</style>