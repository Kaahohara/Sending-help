<template>
  <div>
    <div class="form-box">
      <form @submit.prevent="registerPonto">
        <p style="color: red; font-size: large; text-align: center;">{{ cadastroMessage }}</p>
        <div class="ong-container">
      
          <div class="lados">
            <p style="text-align: center; font-size: 35px;">Cadastre os Centros de Coleta</p>
            <div class="input-group-ong">
              <input type="text" v-model="pontoData.nome" id="nome" name="nome" placeholder="Nome do ponto de coleta:" required>
            </div>
            <div class="input-group-ong">
              <input type="tel" v-model="pontoData.telefone" id="telefone" name="telefone" placeholder="Telefone:" required>
            </div>
            <div class="input-group-ong">
          <select v-model="pontoData.endereco.estado" id="estado" name="estado" required>
            <option disabled value="">Selecione um Estado</option>
            <option value="Amazonas">Amazonas</option>
            <option value="Mato Grosso">Mato Grosso</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
          </select>
        </div>  <div class="input-group-ong">
          <select v-model="pontoData.endereco.cidade" id="cidade" name="cidade" required>
            <option disabled value="">Selecione uma cidade</option>
            <option value="Lagos">Lagos</option>
            <option value="Americana">Americana</option>
            <option value="Frederico">Frederico Westphalen</option>
          </select>
        </div>
            <div class="input-group-ong">
              <input type="text" v-model="pontoData.endereco.rua" id="rua" name="rua" placeholder="Rua:" required>
            </div>
            <div class="input-group-ong">
              <input type="number" v-model="pontoData.endereco.numero" id="numero" name="numero" placeholder="Número:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" v-model="pontoData.endereco.bairro" id="bairro" name="bairro" placeholder="Bairro:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" v-model="pontoData.endereco.cep" id="cep" name="cep" placeholder="CEP:" required>
            </div>
            <button type="submit">Registrar</button>
            <br>
          </div>
        </div>
      </form>
    </div>
    <div class="containerong">
      <div v-for="ponto in filteredPontos" :key="ponto.id" class="containerong-item">
        <div class="picture">
          <img src='@/assets/Amazonia.png' alt="ongimage">
        </div>
        <div class="nameong">
          <p>{{ ponto.nomeUnico }}</p>
          <p>Endereço:{{ ponto.endereco.rua }}, nº {{ ponto.endereco.numero }}, {{ ponto.endereco.cidade }}, cep: {{ ponto.endereco.cep }}.  </p>
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="lados">
        <img src="@/assets/logo.png" width="200px" alt="logo">
      </div>
      <div class="lados">
        <p>Site de doações para desastres naturais. Em tempos de crise, cada gesto de solidariedade faz uma enorme diferença. Junte-se a nós para apoiar comunidades afetadas por desastres ao redor do mundo.</p>
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
      pontoData: {
        nome: '',
        telefone: '',
        endereco: {
          cep: '',
          estado: '',
          cidade: '',
          rua: '',
          bairro: '',
          numero: ''
        }
      },
      pontos: [],
      cadastroMessage: ''
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

    verificalogado() {
      return !!localStorage.getItem('token');
    },
    registerPonto() {
      if (this.pontoData.telefone.length > 11) {
        this.cadastroMessage = 'O telefone deve ter no máximo 11 dígitos.';
        return;
      } if (this.pontoData.endereco.numero <= 0) {
    this.cadastroMessage = 'Numero Inválido.';
    return;
  }

  if (!this.isValidCEP(this.pontoData.endereco.cep)) {
        this.cadastroMessage = 'CEP inválido.';
        return;
      }

      const authToken = localStorage.getItem('token');
      apiClient.post('/ponto', this.pontoData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        response.data;
        this.cadastroMessage = 'Ponto registrado com sucesso';
        this.fetchPontos();
      })
      .catch(error => {
        this.cadastroMessage = 'Falha ao registrar o ponto/Telefone já registrado';
      });
    },
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
    isValidCEP(cep) {
      const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
      return cepRegex.test(cep);
    },
    getOngImage(ponto) {
      return '@/assets/Amazonia.png';
    },
    toggleForm() {
      this.hasLogin = !this.hasLogin;
    }
  }
}
</script>
<style>

.input-group-ong input, .input-group-ong select {
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.ong-container{
  margin-top: -5%;
}
</style>