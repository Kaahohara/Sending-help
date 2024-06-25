<template>
	<div>
	  <div class="menu-toggle" @click="toggleMenu">
		<div class="left">Menu</div>
		<div class="right">{{ name }}</div>
	  </div>		
  
	  <nav class="menu" :style="{ display: menuOpen ? 'block' : 'none' }">
		<ul>
		  <li>
			<router-link to="/">
			  <Home />
			  Início
			</router-link>
		  </li>
	
		  <li v-if="verificalogado() && hasPermission('ADMIN')">
			<router-link to="/administrador-pontos">
			  <AdministradorPontos />
			  Cadastrar Pontos
			</router-link>
		  </li>
		  <li v-if="verificalogado() && hasPermission('ADMIN')">
			<router-link to="/administrador-coletor">
			  <AdministradorColetor/>
			  Cadastrar Coletor
			</router-link>
		  </li>
		  <li v-if="verificalogado() && hasPermission('COLETOR')&& hasPermission('ADMIN')">
			<router-link to="/coletor-entregas">
			  <ColetorEntregas />
			  Entregas 
			</router-link>
		  </li>  
	  
		  <li>
			<router-link to="/doador-doar">
			  <DoadorDoar />
			  Doação
			</router-link>
		  </li>
		  <li v-if="verificalogado()">
			<router-link to="/doador-doacao">
			  <DoadorDoacao />
			  Suas Doações
			</router-link>
		  </li>
		  <li v-if="verificalogado()">
			<a href="#" @click="logout">Sair</a>
		  </li>
		</ul>
	  </nav>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const name = localStorage.getItem('nome') || '';
  
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
  
  const menuOpen = ref(false);
  
  function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('nome');
	localStorage.removeItem('cpf');
	router.push("/");
	window.location.reload()
  }
  
  function toggleMenu() {
	menuOpen.value = !menuOpen.value;
  }
  </script>
  