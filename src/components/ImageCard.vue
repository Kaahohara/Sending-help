<template>
    <div>
        <div class="bg-white block max-w-sm border border-slate-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <a href="#">
                <img class="w-full h-48 object-cover" src='@/assets/Amazonia.png' alt="Amazonia" />
            </a>
        
            <div class="p-6 text-center">
                <span class="inline-flex items-center bg-sky-50 border border-sky-200 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                    <svg class="w-3 h-3 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"/></svg>
                    {{indicatorText}}
                    </span>

                <a href="#">
                    <h5 class="mt-2 mb-6 text-xl font-bold tracking-tight text-slate-900">{{title}}</h5>
                </a>

                <a href="{{buttonLink}}" class="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-xl text-sm px-5 py-2.5 transition-colors shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none">
                {{buttonText}}
                <svg class="w-4 h-4 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    imageSrc: string;
    title: string;
    buttonText: string;
    buttonLink: string;
    indicatorText: string;
}>();
</script>