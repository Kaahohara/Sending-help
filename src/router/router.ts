import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
	history: createWebHistory(import.meta.url),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/HomeView.vue')
		},
		{
			path: '/doador',
			name: 'Doador',
			children: [
				{
					path: '/doador-ong-amazonia',
					name: 'Doador-ong-amazonia',
					component: () => import('@/views/doador/AmazoniaComponent.vue')
				},
				{
					path: '/doador-ong-matogrosso',
					name: 'Doador-ong-matogrosso',
					component: () => import('@/views/doador/MatoGrossoComponent.vue')
				},
				{
					path: '/doador-ong-riojaneiro',
					name: 'Doador-ong-riojaneiro',
					component: () => import('@/views/doador/RioJaneiroComponent.vue')
				},
				{
					path: '/doador-doacao',
					name: 'Doador-doacao',
					component: () => import('@/views/doador/DoacaoComponent.vue')
				},
			],
				},
			

	]
});

export default router;

