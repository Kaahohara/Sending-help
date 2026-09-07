<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full flex flex-col items-center py-8">
    <div class="w-full max-w-4xl h-[450px] rounded-2xl shadow-xl overflow-hidden border border-slate-200" id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  // Inicializa o mapa centralizado em uma coordenada (ex: Manaus)
  const map = L.map('map').setView([-3.119, -60.0217], 13)

  // Adiciona a camada visual do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Adiciona um marcador clicável no mapa
  const marker = L.marker([-3.119, -60.0217]).addTo(map)
  marker.bindPopup("<b>Local de Doação</b><br>Venha nos visitar!").openPopup()
})
</script>