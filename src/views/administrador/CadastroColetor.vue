<template>
  <div>
    <div class="form-box">
      <form @submit.prevent="registerColetor">
        <p style="color: red; font-size: large; text-align: center;">{{ cadastroMessage }}</p>
        <div class="ong-container">
          <div class="lados">
            <p style="text-align: center; font-size: 35px;">Cadastro de Coletor</p>
            
           
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
      
        <div class="nameong">
          <p>Nome: {{ coletor.nomeCompleto }} </p>
          <p> E-mail:{{ coletor.email }} {{ coletor.telefoneContato }}</p>
          <p>CPF:{{ coletor.cpf }} Data Nascimento: {{ coletor.dataNascimento }}</p>
          <p>Centro de coleta: {{ coletor.pontoColeta }}</p>
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
    validarCPF(cpf) {
      cpf = String(cpf).replace(/[^\d]+/g, '');
      if (cpf === '') return false;

      if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return false;

      let add = 0;
      for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev === 10 || rev === 11)
        rev = 0;
      if (rev !== parseInt(cpf.charAt(9)))
        return false;

      add = 0;
      for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev === 10 || rev === 11)
        rev = 0;
      if (rev !== parseInt(cpf.charAt(10)))
        return false;

      return true;
    },
    verificalogado() {
      return !!localStorage.getItem('token');
    },
    async registerColetor() {
    
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
       
        if (this.coletorData.telefoneContato.length > 11) {
          this.cadastroMessage = 'O telefone deve ter no máximo 11 dígitos.';
          return;
        }
        if (!this.validarCPF(this.coletorData.cpf)) {
        this.cadastroMessage = 'CPF inválido';
        return;
      }if (this.coletorData.nomeCompleto.length < 11) {
        this.cadastroMessage = 'O nome deve ter no minimo 11 dígitos.';
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

          await apiClient.post('/auth/login', {
            login: this.coletorData.email,
            password: "123"
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }
          }).then(response => {
            const ColetorToken = response.data.token;
            localStorage.setItem('tokenColetor', ColetorToken);
          });

          const tokenColetor = localStorage.getItem('tokenColetor');
          await apiClient.post('/coletor', this.coletorData,  {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Authorization': `Bearer ${tokenColetor}`
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
