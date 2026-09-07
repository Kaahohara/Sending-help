<template>
  <nav class="bg-neutral-primary border-default border-b relative">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
      
      <!-- Logo / Início -->
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-xl font-semibold whitespace-nowrap text-heading">Portfólio</span>
      </router-link>

      <!-- Botões de Ação Direita -->
      <div class="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
        <template v-if="!verificalogado()">
          <router-link to="/login" class="text-heading bg-neutral-primary box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">Login</router-link>
          <router-link to="/register" class="text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">Sign Up</router-link>
        </template>
        <template v-else>
          <span class="text-sm font-medium text-heading hidden sm:inline-block mr-2">Olá, {{ name }}</span>
          <button @click="logout" class="text-white bg-red-600 hover:bg-red-700 box-border border border-transparent focus:ring-4 focus:ring-red-300 shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">Sair</button>
        </template>

        <!-- Botão Toggle Mobile -->
        <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-lg md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-default" aria-controls="mega-menu" :aria-expanded="menuOpen">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
        </button>
      </div>

      <!-- Links de Navegação com Dropdown Admin -->
      <div id="mega-menu" :class="[menuOpen ? 'flex' : 'hidden', 'items-center justify-between w-full md:flex md:w-auto md:order-1']">
        <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-6 rtl:space-x-reverse w-full md:w-auto items-start md:items-center">
          
          <li>
            <router-link to="/" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0">
              Início
            </router-link>
          </li>

          <!-- DROPDOWN DE ADMINISTRAÇÃO -->
          <li v-if="verificalogado() && hasPermission('ADMIN')" class="relative">
            <button @click="toggleAdminDropdown" class="flex items-center justify-between w-full py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0 focus:outline-none">
              Painel Admin
              <svg class="w-4 h-4 ml-1.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
            </button>
            
            <!-- Caixa do Dropdown -->
            <div v-if="adminDropdownOpen" class="md:absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <router-link to="/administrador-pontos" @click="adminDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Cadastrar Pontos
              </router-link>
              <router-link to="/administrador-coletor" @click="adminDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Cadastrar Coletor
              </router-link>
              <router-link to="/administrador-relatorio" @click="adminDropdownOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Relatórios
              </router-link>
            </div>
          </li>

          <li v-if="verificalogado() && (hasPermission('COLETOR') || hasPermission('ADMIN'))">
            <router-link to="/coletor-entregas" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0">
              Entregas 
            </router-link>
          </li>  
      
          <li>
            <router-link to="/doador-doar" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0">
              Doação
            </router-link>
          </li>

          <li>
            <router-link to="/doador-centro" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0">
              Centros de doações
            </router-link>
          </li>

          <li v-if="verificalogado() && hasPermission('DONOR')">
            <router-link to="/doador-doacao" class="block py-2 px-3 text-heading hover:text-fg-brand border-b border-light md:border-0 md:p-0">
              Suas Doações
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>
 
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
 
const router = useRouter();
const name = localStorage.getItem('nome') || '';
const menuOpen = ref(false);
const adminDropdownOpen = ref(false);
 
function verificalogado() {
  return !!localStorage.getItem('token');
}
 
function getPermissions() {
  const token = localStorage.getItem('token');
  if (!token) return [];
 
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || [];
  } catch (error) {
    console.error('Invalid token format', error);
    return [];
  }
}
 
function hasPermission(role: string) {
  const permissions = getPermissions();
  return permissions.includes(role);
}
 
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('nome');
  localStorage.removeItem('cpf');
  router.push("/");
  window.location.reload();
}
 
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function toggleAdminDropdown() {
  adminDropdownOpen.value = !adminDropdownOpen.value;
}
</script>