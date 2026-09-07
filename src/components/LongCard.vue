<template>
  <div class="flex flex-col items-center max-w-6xl bg-white border border-slate-200 rounded-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 md:flex-row w-full overflow-hidden p-2">
    <img class="object-cover w-full h-72 md:h-80 md:w-1/2 shrink-0 rounded-2xl" src="@/assets/Amazonia.png" alt="Imagem do card" />
    <div class="flex flex-col justify-between p-8 md:p-12 leading-normal w-full md:w-1/2">
      <div>
        <h5 class="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{{ title }}</h5>
        <p class="mb-8 text-lg text-slate-600 leading-relaxed">{{ description }}</p>
      </div>
      <div>
        <router-link :to="buttonLink" class="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-base px-6 py-3.5 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
          {{ buttonText }}
          <svg class="w-5 h-5 ms-2 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
}>();
</script>