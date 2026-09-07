<template>
  <div>
      <div class="flex items-center justify-center mx-auto py-10" v-if="filteredPontos.length === 0">
        <WarningText variant="Dark" warningText="Nenhum ponto registrado no momento."></WarningText>
      </div>
      <div v-else>
        <div v-for="ponto in filteredPontos" :key="ponto.id">
            <div class="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              <div class="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
                
                <div class="px-8 pt-8 pb-4 border-b border-slate-100">
                  <h2 class="text-2xl font-bold tracking-tight text-slate-900">Localização e Pontos de Doação</h2>
                  <p class="text-sm text-slate-500 mt-1">Visualize no mapa o centro de coleta mais próximo de você.</p>
                </div>

                <!-- Container do Mapa -->
                <div class="p-6">
                  <div class="w-full h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                    <MapsLeaflet />
                  </div>
                </div>

                <!-- Seção de Dados Detalhados -->
                <div class="px-8 pb-8 pt-2">
                  <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 font-bold">
                        📍
                      </div>
                      <div>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1">
                          Centro Ativo
                        </span>
                        <h3 class="text-lg font-bold text-slate-900">Nome do centro: <span class="font-normal text-slate-700">Central de Doações Esperança</span></h3>
                        <p class="text-sm text-slate-500 mt-0.5">Rua Principal, 123 - Centro, Manaus - AM</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <span class="text-sm font-medium text-slate-600">Horário: 08:00 - 18:00</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

        </div>
      </div>
  </div>


  <FooterCard></FooterCard>
</template>

<script setup>

import WarningText from '@/components/WarningText.vue';
import FooterCard from '@/components/FooterCard.vue';
</script>
<script>
import apiClient from '@/axios';
import MapsLeaflet from '@/components/MapsLeaflet.vue';

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

