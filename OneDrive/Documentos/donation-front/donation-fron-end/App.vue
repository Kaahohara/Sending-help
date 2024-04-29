
<template>
    <div class="flex flex-col h-full w-full">
        <HeaderNav/>
        <RouterView />
        <Toaster />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Toaster from '@/components/ui/toast/Toaster.vue';
import HeaderNav from './components/HeaderNav.vue';

</script>
