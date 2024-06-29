<template>
  <div>
    <div class="containerong">
      <div v-if="filteredPontos.length === 0" class="no-pontos">
        <p>Nenhum ponto registrado no momento.</p>
      </div>
      <div v-else>
        <div v-for="ponto in filteredPontos" :key="ponto.id" class="containerong-item">
          <div class="picture">
            <img src='@/assets/Amazonia.png' alt="ong">
          </div>
          <div class="nameong">
            <p>Nome do centro: {{ ponto.nomeUnico }}</p>
            <p>Endereço: {{ ponto.endereco.rua }}, nº {{ ponto.endereco.numero }}, {{ ponto.endereco.cidade }}, cep: {{ ponto.endereco.cep }}.</p>
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

export default {
  data() {
    return {
      pontos: []
    };
  },
  computed: {
    filteredPontos() {
      return this.pontos;
    }
  },
  mounted() {
    this.fetchPontos();
  },
  methods: {
    fetchPontos() {
      apiClient.get('/ponto', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      })
      .then(response => {
        this.pontos = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar ponto:', error);
      });
    },
    getOngImage(ponto) {
      return '@/assets/Amazonia.png';
    }
  }
}
</script>

<style>
.no-pontos {
  text-align: center;
  padding: 20px;
  background-color: #D9D9D9;
  border-radius: 15px;
  margin: 20px auto;
  width: 80%;
}
</style>
