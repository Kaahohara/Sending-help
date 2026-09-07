<template>
    <div class="w-full flex items-center justify-center py-16 px-6">
        <div class="max-w-4xl text-center">
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-5xl leading-tight">
            {{title}} <span class="underline underline-offset-4 decoration-8 decoration-blue-600">{{underlineText}}</span>
        </h1>
        <p class="text-lg font-normal text-slate-600 lg:text-xl leading-relaxed">
            {{description}}
        </p>
        </div>
    </div>
</template>


<script setup lang="ts">
    defineProps<{
        title: string;
        description: string;
        underlineText: string;
    }>();
</script>