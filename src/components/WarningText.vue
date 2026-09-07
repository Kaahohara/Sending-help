<template>
  <div class="flex w-full items-center justify-center mx-auto">
    <div>
      <div v-if="variant === 'Info'" class="p-4 mb-4 text-sm text-blue-800 rounded-xl bg-blue-50 border border-blue-200" role="alert">
        <span class="font-semibold">{{warningName}}!</span> {{ warningText }}
        <slot />
      </div>

      <div v-else-if="variant === 'Danger'" class="p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200" role="alert">
        <span class="font-semibold">{{warningName}}</span> {{ warningText }}
        <slot />
      </div>

      <div v-else-if="variant === 'Success'" class="p-4 mb-4 text-sm text-emerald-800 rounded-xl bg-emerald-50 border border-emerald-200" role="alert">
        <span class="font-semibold">{{warningName}}</span> {{ warningText }}
        <slot />
      </div>

      <div v-else-if="variant === 'Warning'" class="p-4 mb-4 text-sm text-amber-800 rounded-xl bg-amber-50 border border-amber-200" role="alert">
        <span class="font-semibold">{{warningName}}</span> {{ warningText }}
        <slot />
      </div>

      <div v-else-if="variant === 'Dark'" class="p-4 text-sm text-slate-900 rounded-xl bg-slate-100 border border-slate-300" role="alert">
        <span class="font-semibold">{{warningName}}</span> {{ warningText }}
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning } from 'postcss';

withDefaults(
  defineProps<{
    warningName: string;
    warningText: string;
    variant?: 'Info' | 'Danger' | 'Success' | 'Warning' | 'Dark'
  }>(),
  {
    variant: 'Info'
  }
)
</script>