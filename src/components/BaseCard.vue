<template>
    <div class="bg-white block max-w-sm p-6 border border-slate-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <h5 class="mb-3 text-2xl font-bold tracking-tight text-slate-900 leading-8">{{title}}</h5>
        <p class="text-slate-600 mb-6 leading-relaxed">{{description}}</p>
        
        <a href="{{buttonLink}}" class="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 shadow-md font-medium rounded-xl text-sm px-5 py-2.5 transition-colors focus:ring-4 focus:ring-blue-300 focus:outline-none">
        {{buttonText}}
        <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
        </a>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}>();

</script>