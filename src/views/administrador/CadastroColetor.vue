<template>
  <div>
    <div class="form-box">
      <form @submit.prevent="registerColetor">
        <p style="color: red; font-size: large; text-align: center;">{{ cadastroMessage }}</p>
        <div class="ong-container">
          <div class="lados">
            <div class="input-group-ong">
              <input type="text" v-model="coletorData.nomeCompleto" id="nomeCompleto" name="nomeCompleto" placeholder="Nome Completo" required>
            </div>
            <div class="input-group-ong">
              <input type="tel" v-model="coletorData.telefoneContato" id="telefoneContato" name="telefoneContato" placeholder="telefone de Contato:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" v-model="coletorData.cpf" id="cpf" name="cpf" placeholder="CPF:" required>
            </div>
            <div class="input-group-ong">
              <input type="date" v-model="coletorData.dataNascimento" id="dataNascimento" name="dataNascimento" placeholder="Data de Nascimento:" required>
            </div>
           
            <div class="input-group-ong">
              <input type="email" v-model="coletorData.email" id="email" name="email" placeholder="Email:" required>
            </div>
            <div class="input-group-ong">
              <select v-model="coletorData.pontoColeta" id="pontoColeta" name="pontoColeta" required>
                <option disabled value="">Selecione um Ponto de Coleta</option>
                <option v-for="centro in centros" :key="centro.id" :value="centro.nomeUnico">{{ centro.nomeUnico }}</option>
              </select>
            </div>
            <div class="input-group-ong">
              <input type="number" v-model="coletorData.horasCumpridas" id="horasCumpridas" name="horasCumpridas" placeholder="Horas Cumpridas:" required>
            </div>
            <button type="submit">Registrar</button>
            <br>
          </div>
        </div>
      </form>
    </div>
    <div class="containerong" v-if="filteredColetor.length">
      <div v-for="coletor in filteredColetor" :key="coletor.id" class="containerong-item">
        <div class="picture">
          <img src='@/assets/Amazonia.png' alt="ongimage">
        </div>
        <div class="nameong">
          <p>{{ coletor.nomeCompleto }} {{ coletor.cpf }} {{ coletor.email }} {{ coletor.dataNascimento }}</p>
          <p>{{ coletor.telefoneContato }} {{ coletor.pontoColeta }}</p>
        
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
      coletorData: {
        nomeCompleto: '',
        cpf: '',
        dataNascimento: '',
        telefoneContato: '',
        email: '',
        pontoColeta: '',
        horasCumpridas: 0
      },
      coletor: [],
      centros: [],
      cadastroMessage: ''
    };
  },
  computed: {
    filteredColetor() {
      return this.coletor;
    }
  },
  mounted() {
    this.fetchColetor();
    this.fetchCentro();
  },
  methods: {
    verificalogado() {
      return !!localStorage.getItem('token');
    },
    async registerColetor() {
      if (this.coletorData.telefoneContato.length > 11) {
        this.cadastroMessage = 'O telefone deve ter no máximo 11 dígitos.';
        return;
      }

      try {
        const authToken = localStorage.getItem('token');
        
        const existingColetor = await apiClient.get('/coletor', {
          params: {
            email: this.coletorData.email,
            cpf: this.coletorData.cpf
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (existingColetor.data.exists) {
          this.cadastroMessage = 'Coletor com este email ou CPF já está registrado.';
          return;
        }

        await apiClient.post('/auth/register', {
          login: this.coletorData.email,
          password: "123",
          role: "COLETOR"
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });

        await apiClient.post('/coletor', this.coletorData,  {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });

        this.cadastroMessage = 'Coletor registrado com sucesso';
        this.fetchColetor();
      } catch (error) {
        this.cadastroMessage = 'Falha ao registrar o Coletor/Telefone já registrado';
        console.error('Erro ao registrar coletor:', error);
      }
    },
    fetchColetor() {
      const authToken = localStorage.getItem('token');
      apiClient.get('/coletor', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        this.coletor = response.data || [];
      })
      .catch(error => {
        console.error('Erro ao buscar coletor:', error);
        this.coletor = [];
      });
    },
    fetchCentro() {
      const authToken = localStorage.getItem('token');
      apiClient.get('/ponto', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(response => {
        this.centros = response.data || [];
      })
      .catch(error => {
        console.error('Erro ao buscar ponto:', error);
        this.centros = [];
      });
    }
  }
}
</script>
