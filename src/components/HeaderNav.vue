<template>
 <div class="menu-toggle" @click="toggleMenu">Menu</div>

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
						to="/doador-ong-amazonia"
					>
						<Doador-ong-amazonia />
						ONG'S
			</router-link>
		</li>
        <li>
			<router-link
						to="/doador-doacao"
					>
						<Doador-doacao />
						Doação
			</router-link>
		</li>
      </ul>
    </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

</script>
