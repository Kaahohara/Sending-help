<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1">
     

      <div class="p-8 md:p-12 flex flex-col justify-center">
        <div v-if="!verificalogado()">
            <WarningText variant="Warning" warningText="Por favor, faça login para cadastrar sua doação.">
              <router-link to="/login" class="font-semibold underline mt-1 inline-block">Ir para a página de login</router-link>
            </WarningText>
        </div>

        <form @submit.prevent="registerDonation" class="space-y-4">
          <p v-if="cadastroMessage" class="text-sm font-medium text-emerald-600 bg-emerald-50 py-2 px-3 rounded-lg text-center">
            {{ cadastroMessage }}
          </p>

          <h3 class="text-2xl font-bold tracking-tight text-slate-900 mb-6">{{ title }}</h3>

          <slot />

          <button type="submit" class="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
            {{ buttonText }}
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import WarningText from './WarningText.vue';
import roupaImg from '@/assets/roupa.png'

    defineProps<{
        buttonText: string;
        title: string;
    }>();
const cadastroMessage = ref('')

const donationData = reactive({
  tipo: '',
  quantidade: '',
  endereco: {
    cidade: '',
    estado: '',
    numero: '',
    bairro: '',
    rua: ''
  }
})

function verificalogado() {
  return !!localStorage.getItem('token')
}

</script>