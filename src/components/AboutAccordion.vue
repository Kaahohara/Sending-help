<template>
  <div class="w-full flex items-center justify-center">
      <div class="flex items-center w-full max-w-6xl py-2 h-full justify-center">
        <div class="max-w-6xl rounded-2xl border border-slate-200 overflow-hidden shadow-lg bg-white">
          
          <div class="border-b border-slate-200">
            <h2>
              <button type="button" @click="toggleAccordion(1)" class="flex items-center justify-between w-full p-5 font-medium text-slate-800 hover:bg-slate-50 transition-colors gap-3">
                <span>What is Flowbite?</span>
                <svg :class="{'rotate-180': activeAccordion === 1}" class="w-5 h-5 transition-transform duration-200 shrink-0 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
              </button>
            </h2>
            <div v-show="activeAccordion === 1" class="p-4 md:p-5 bg-slate-50/50">
              <p class="mb-2 text-slate-600">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
              <p class="text-slate-600">Check out this guide to learn how to <a href="#" class="text-blue-600 hover:underline font-medium">get started</a> and start developing websites even faster.</p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="border-b border-slate-200">
            <h2>
              <button type="button" @click="toggleAccordion(2)" class="flex items-center justify-between w-full p-5 font-medium text-slate-800 hover:bg-slate-50 transition-colors gap-3">
                <span>Is there a Figma file available?</span>
                <svg :class="{'rotate-180': activeAccordion === 2}" class="w-5 h-5 transition-transform duration-200 shrink-0 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
              </button>
            </h2>
            <div v-show="activeAccordion === 2" class="p-4 md:p-5 bg-slate-50/50">
              <p class="mb-2 text-slate-600">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
              <p class="text-slate-600">Check out the <a href="#" class="text-blue-600 hover:underline font-medium">Figma design system</a> based on utility classes.</p>
            </div>
          </div>

          <!-- Item 3 -->
          <div>
            <h2>
              <button type="button" @click="toggleAccordion(3)" class="flex items-center justify-between w-full p-5 font-medium text-slate-800 hover:bg-slate-50 transition-colors gap-3">
                <span>What are the differences between Flowbite and Tailwind UI?</span>
                <svg :class="{'rotate-180': activeAccordion === 3}" class="w-5 h-5 transition-transform duration-200 shrink-0 text-slate-500" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
              </button>
            </h2>
            <div v-show="activeAccordion === 3" class="p-4 md:p-5 bg-slate-50/50">
              <p class="mb-2 text-slate-600">The main difference is that core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product.</p>
              <p class="mb-2 text-slate-600">However, we actually recommend using both depending on your project's scope and requirements.</p>
              <ul class="ps-5 text-slate-600 list-disc space-y-1">
                <li><a href="#" class="text-blue-600 hover:underline">Flowbite Pro</a></li>
                <li><a href="#" class="text-blue-600 hover:underline">Tailwind UI</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const activeAccordion = ref(1)

  function toggleAccordion(index) {
    activeAccordion.value = activeAccordion.value === index ? null : index
  }
</script>