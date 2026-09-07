<template>
  <div>
    <ImageBanner title="We invest in the world’s potential" description="Seja bem-vindo ao nosso site de doações para desastres naturais. Em tempos de crise, cada gesto de solidariedade faz uma enorme diferença. Junte-se a nós para apoiar comunidades afetadas por desastres ao redor do mundo." ButtonText="Getting started" ButtonText2="Saiba mais" ></ImageBanner>  
    <div class="flex items-center w-full py-10 h-full justify-center">
      <div class="grid grid-cols-3 gap-4">
        <ImageCard :imageSrc="'amazoniaImg'" :title="'Streamlining your design process today.'" :buttonText="'Read more'" :buttonLink="'#'" :indicatorText="'Trending'"></ImageCard>
        <ImageCard :imageSrc="'amazoniaImg'" :title="'Streamlining your design process today.'" :buttonText="'Read more'" :buttonLink="'#'" :indicatorText="'Trending'"></ImageCard>
        <ImageCard :imageSrc="'amazoniaImg'" :title="'Streamlining your design process today.'" :buttonText="'Read more'" :buttonLink="'#'" :indicatorText="'Trending'"></ImageCard>
      </div>
    </div>
    <div class="py-10">
      <LongCard :title="'Streamlining your design process today.'" :description="'Here are the biggest technology acquisitions so far, in reverse chronological order.'" :buttonText="'Read more'" :buttonLink="'#'" ></LongCard>
    </div>
    <div class="bg-green-900 flex py-10 justify-center p-4 ">
        <div class="grid grid-cols-1 max-w-11/12 lg:grid-cols-3 gap-4">
          <BaseCard :title="'Noteworthy Technology Acquisitions 2021'" :description="'Here are the biggest technology acquisitions so far, in reverse chronological order.'" :buttonText="'Read more'" :buttonLink="'#'" ></BaseCard>
          <BaseCard :title="'Learn More About Our Impact'" :description="'Discover how our initiatives are making a difference in communities around the world.'" :buttonText="'Learn more'" :buttonLink="'#'" ></BaseCard>
          <BaseCard :title="'Get Started Today'" :description="'Join our community of supporters and help us create a better future for those in need.'" :buttonText="'Get started'" :buttonLink="'#'" ></BaseCard>
        </div>
      </div>
    <div v-if="!verificalogado()" class="min-h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        
        <!-- Seção de Cadastro (Etapa 1 e Etapa 2) -->
        <div v-if="!hasLogin">
          <p v-if="cadastroMessage" class="mb-4 text-center text-sm font-medium text-emerald-600 bg-emerald-50 py-2 rounded-lg">
            {{ cadastroMessage }}
          </p>
          
          <!-- Etapa 1: Credenciais de Acesso -->
          <div v-if="!part2">
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 mb-6 text-center">CADASTRO</h2>
            <form @submit.prevent="registerUser" class="space-y-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">Email / Username</label>
                <input type="email" v-model="loginData.login" placeholder="name@example.com" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">Password</label>
                <input type="password" v-model="loginData.password" placeholder="••••••••" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>

              <button type="submit" class="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
                Registrar
              </button>
            </form>
            <div class="text-center mt-6">
              <a @click="toggleForm" class="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Já tem uma conta? Faça login</a>
            </div>
          </div>

          <!-- Etapa 2: Dados do Doador -->
          <div v-else>
            <h2 class="text-2xl font-bold tracking-tight text-slate-900 mb-6 text-center">Complete seu Cadastro</h2>
            <form @submit.prevent="registerDoador" class="space-y-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">Nome Completo</label>
                <input type="text" v-model="doadorData.nomeCompleto" placeholder="Seu nome completo" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">Data de Nascimento</label>
                <input type="date" v-model="doadorData.dataNascimento" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">Telefone</label>
                <input type="number" v-model="doadorData.telefoneContato" placeholder="(00) 00000-0000" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-slate-700">CPF</label>
                <input type="text" v-model="doadorData.cpf" placeholder="000.000.000-00" required 
                  class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
              </div>

              <button type="submit" class="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
                Finalizar Cadastro
              </button>
            </form>
          </div>
        </div>

        <!-- Seção de Login -->
        <div v-else class="login-container">
          <div v-if="loginMessage" class="mb-4 text-center text-sm font-medium text-red-600 bg-red-50 py-2 rounded-lg">
            Tente Novamente!
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 mb-6 text-center">LOGIN</h2>
          <form @submit.prevent="submitForm" class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-slate-700">Email / Username</label>
              <input type="email" v-model="loginData.login" placeholder="name@example.com" required 
                class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-medium text-slate-700">Password</label>
              <input type="password" v-model="loginData.password" placeholder="••••••••" required 
                class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3.5 py-2.5 shadow-sm placeholder:text-slate-400 outline-none transition-all" />
            </div>
            
            <button type="submit" class="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
              Login
            </button>
          </form>

          <div class="text-center mt-6">
            <a @click="toggleForm" class="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Ainda não tem uma conta? Cadastre-se</a>
          </div>
        </div>
      </div>
      

      </div>
    </div>
    <AboutAccordion></AboutAccordion>
   
    <FooterCard />
  

</template>

<script setup>
  import amazoniaImg from '@/assets/Amazonia.png'
  import BaseCard from '@/components/BaseCard.vue';
  import FooterCard from '@/components/FooterCard.vue';
  import ImageCard from '@/components/ImageCard.vue';
  import AboutAccordion from '@/components/AboutAccordion.vue';
  import ImageBanner from '@/components/ImageBanner.vue';
</script>
<script>
import amazoniaImg from '@/assets/Amazonia.png'
import apiClient from '@/axios';
import ImageCard from '@/components/ImageCard.vue';
import LongCard from '@/components/LongCard.vue';
export default {
  data() {
    return {
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

    submitForm() {

          apiClient.post('/auth/login', this.loginData, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }
          })
        
              .then(response => {
              this.cadastroMessage = true;
              const authToken = response.data.token;
            
           
              
                apiClient.get('/doador', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                   'Authorization': `Bearer ${authToken}`
                  }})
                  .then(response => {
                      this.loginMessage = null;
                      
                    const doadores=response.data.filter(doador => doador.email === this.loginData.login);
                    if (doadores.length === 0 || doadores[0] == null || doadores[0].length === 0) {
                        this.part2 = true;
                        localStorage.setItem('login',this.loginData.login );
                        this.loginMessage = true;
                        this.hasLogin=false;
                      }else{
                        localStorage.setItem('nome', doadores[0].nomeCompleto);
                        localStorage.setItem('cpf',doadores[0].cpf);
                        localStorage.setItem('token', authToken);
                     
                      this.$router.push('/doador-doar');
                    }
                    })
       
    }).catch(error => {
               
    this.loginMessage = false;
    })
  },
    registerDoador() {
      
      this.cadastroMessage = null;
      if (!this.validarCPF(this.doadorData.cpf)) {
        this.cadastroMessage = 'CPF inválido';
        return;
      }
      apiClient.post('/auth/login', this.loginData, {
                  headers: {
                  'Content-Type': 'application/json',
                  'Accept': '*/*'
                }
                })
                
                  .then(response => {
                    const authToken = response.data.token;
                    
                  
                    this.doadorData.email = this.loginData.login
                    if (this.doadorData.nomeCompleto.length <= 11) {
                        this.cadastroMessage='Insira o nome completo';
                       
                    }
                    if (this.doadorData.nomeCompleto.length > 11) {
 
                    apiClient.post('/doador', this.doadorData, {
                      headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Authorization': `Bearer ${authToken}`
                      }
                    })
                  
                          .then(response => {
                            if(response.status===201){
                              localStorage.setItem('login', this.doadorData.login);
                              localStorage.setItem('nome', this.doadorData.nomeCompleto);
                              localStorage.setItem('cpf', this.doadorData.cpf);
                              localStorage.setItem('token', authToken);
                              this.$router.push('/doador-doar');
                            }else{
                              this.cadastroMessage = 'CPF já cadastrado';
                            }
                            })
                          .catch(error => {
                              if (error.response) {
                                  this.cadastroMessage = 'CPF já cadastrado';
                              } else {
                                  this.cadastroMessage = 'Tente Novamente';
                              }
                                })
                 
            
          } 
         
        }).catch(error => {
              if (error.response) {
                                  this.cadastroMessage = 'CPF já cadastrado';
                              } else {
                                  this.cadastroMessage = 'Tente Novamente';
                              }
                  
                  })
    },
    registerUser() {
      
          apiClient.post('/auth/register',{ ...this.loginData, role:"DONOR"}, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }
          })
          .then(response => {
                 this.part2=true;
                 
      this.cadastroMessage = null;
                    
      })
               .catch(error => {
                  if (error.response ) {
                    this.cadastroMessage = 'E-mail já cadastrado';
                  } else {
                    this.cadastroMessage = 'Tente Novamente';
                  }
                })
                
    },
  

    toggleForm() {
      this.hasLogin = !this.hasLogin;
    }
  }
}
</script>