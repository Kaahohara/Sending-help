<template>
  <div>
    <div class="switch-buttons">
      <button @click="mostrarDoacoes = true; mostrarDoadores = false; mostrarColetores = false; mostrarCentros = false;">Mostrar Doações</button>
      <button @click="mostrarDoacoes = false; mostrarDoadores = true; mostrarColetores = false; mostrarCentros = false;">Mostrar Doadores</button>
      <button @click="mostrarDoacoes = false; mostrarDoadores = false; mostrarColetores = true; mostrarCentros = false;">Mostrar Coletores</button>
      <button @click="mostrarDoacoes = false; mostrarDoadores = false; mostrarColetores = false; mostrarCentros = true;">Mostrar Centros</button>
    </div>

    <div v-if="mostrarDoacoes">
      <div class="container-entrega" v-if="donations.length">
        <div class="box-entrega" v-for="donation in donations" :key="donation.codigo" :style="{ backgroundColor: getBackgroundColor(donation.status) }">
          <p>Tipo da Entrega: {{ donation.tipo }}</p>
          <p><strong>Endereço: {{ donation.endereco.rua }}, nº {{ donation.endereco.numero }}, {{ donation.endereco.cidade }}, cep: {{ donation.endereco.cep }}.</strong></p>
          <p><strong>Status:</strong> {{ donation.status }}</p>
          <button @click="updateStatus(donation.codigo)">Atualizar Status</button>
        </div>
      </div>
      <div v-else class="no-deliveries">
        Nenhuma entrega encontrada.
      </div>
    </div>

    <div v-else-if="mostrarDoadores">
      <div class="container-entrega" v-if="doadores.length">
        <div class="box-entrega" v-for="doador in doadores" :key="doador.id">
          <p style="color: black;"><strong>Nome:</strong> {{ doador.nomeCompleto }}</p>
          <p style="color: black;"><strong>Telefone:</strong> {{ doador.telefoneContato }}</p>
          <p style="color: black;"><strong>E-mail:</strong> {{ doador.email }}</p>
          <p style="color: black;"><strong>CPF:</strong> {{ doador.cpf }}</p>
          <p style="color: black;"><strong>Data Nascimento:</strong> {{ doador.dataNascimento }}</p>
        </div>
      </div>
      <div v-else class="no-deliveries">
        Nenhum doador encontrado.
      </div>
    </div>

    <div v-else-if="mostrarColetores">
      <div class="container-entrega" v-if="coletores.length">
        <div class="box-entrega" v-for="coletor in coletores" :key="coletor.id">
          <p style="color:black"><strong>Nome:</strong> {{ coletor.nomeCompleto }}</p>
          <p style="color:black"><strong>E-mail:</strong> {{ coletor.email }}</p>
          <p style="color:black"><strong>Telefone:</strong> {{ coletor.telefoneContato }}</p>
          <p style="color:black"><strong>CPF:</strong> {{ coletor.cpf }}</p>
          <p style="color:black"><strong>Data Nascimento:</strong> {{ coletor.dataNascimento }}</p>
          <p style="color:black"><strong>Centro de Coleta:</strong> {{ coletor.pontoColeta }}</p>
        </div>
      </div>
      <div v-else class="no-deliveries">
        Nenhum coletor encontrado.
      </div>
    </div>

    <div v-else-if="mostrarCentros">
      <div class="container-entrega" v-if="centros.length">
        <div class="box-entrega" v-for="centro in centros" :key="centro.id">
          <p style="color:black">{{ centro.nomeUnico }}</p>
          <p style="color:black">Endereço: {{ centro.endereco.rua }}, nº {{ centro.endereco.numero }}, {{ centro.endereco.cidade }}, CEP: {{ centro.endereco.cep }}.</p>
        </div>
      </div>
      <div v-else class="no-deliveries">
        Nenhum centro encontrado.
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
      donations: [],
      doadores: [],
      coletores: [],
      centros: [],
      mostrarDoacoes: true,
      mostrarDoadores: false,
      mostrarColetores: false,
      mostrarCentros: false
    };
  },
  mounted() {
    this.fetchDonations();
    this.fetchDoadores();
    this.fetchColetores();
    this.fetchCentros();
  },
  methods: {
    getBackgroundColor(status) {
      if (status === 'COLETADA') {
        return 'blue';
      } else if (status === 'CANCELADA') {
        return 'red';
      } else if (status === 'FINALIZADA') {
        return '#D9D9D9';
      } else {
        return 'green';
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
    fetchDoadores() {
      apiClient.get('/doador', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(response => {
          this.doadores = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar doadores:', error);
        });
    },
    fetchColetores() {
      apiClient.get('/coletor', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(response => {
          this.coletores = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar coletores:', error);
        });
    },
    fetchCentros() {
      apiClient.get('/ponto', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(response => {
          this.centros = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar centros:', error);
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
.box-entrega p{
  text-align: left;
}
.switch-buttons {
  text-align: center;
  margin-bottom: 20px;
}

.switch-buttons button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #2b4a33;
  color: white;
  border-radius: 5px;
}

.switch-buttons button:hover {
  background-color: #1F3925;
}
</style>
