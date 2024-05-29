<template>
	<div>
		<div class="menu-toggle" @click="toggleMenu">
			<div class="left">Menu</div>
			<div class="right">{{name}}</div>
		</div>		

 <nav class="menu" :style="{ display: menuOpen ? 'block' : 'none' }">

      <ul>
        <li>	
			<router-link
						to="/"
					>
						<Home />
						Início
			</router-link>
		</li>
  
        <li>
			<router-link
						to="/doador-pontos"
					>
						<Doador-pontos />
						Pontos de coleta
			</router-link>
		</li>
		<li>
			<router-link
						to="/doador-doacao"
					>
						<Doador-doacao />
						Suas Doações
			</router-link>
		</li>
        <li>
			<router-link
						to="/doador-doar"
					>
						<Doador-doar />
						Doação
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
const name = localStorage.getItem('nome');
function verificalogado(){
      return !!localStorage.getItem('token');
    }
const menuOpen = ref(false);
function logout(){
	localStorage.removeItem('token');
	localStorage.removeItem('nome');
	localStorage.removeItem('cpf');
	window.location.reload()
}
function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

</script>
