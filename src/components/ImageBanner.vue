
<template>
    <div class="fundoWood flex items-center justify-center">
      <section class="bg-neutral-primary flex h-full items-center max-w-11/12">
          <div class="py-8 px-4 w-1/2  max-w-screen-2xl text-center lg:py-16">
              <h1 class="mb-6 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">{{title}}</h1>
              <p class="mb-8 text-base font-normal text-body md:text-xl">{{ description }}</p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
                  <button type="button" class="inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-5 py-3 focus:outline-none">
                      {{ButtonText}}
                      <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                  </button>
                   <a href="#" class="inline-flex items-center text-white bg-green-600 hover:bg-green-700 shadow-md font-medium rounded-xl text-sm px-5 py-2.5 transition-colors focus:ring-4 focus:ring-green-300 focus:outline-none">
                    {{ ButtonText2 }}
                  </a>
                </div>
          </div>
      </section>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        title: string;
        description: string;
        ButtonText: string;
        ButtonText2: string;
    }>();
</script>