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
					path: '/doador-pontos',
					name: 'Doador-pontos',
					component: () => import('@/views/doador/PontosComponent.vue')
				},
				
				{
					path: '/doador-doar',
					name: 'Doador-doar',
					component: () => import('@/views/doador/DoacaoComponent.vue')
				},
				{
					path: '/doador-doacao',
					name: 'Doador-doacao',
					component: () => import('@/views/doador/DoadosComponent.vue')
				},
			],
				},
				{
					path: '/administrador',
				name: 'Administrador',
				children: [
					
					{
						path: '/administrador-pontos',
						name: 'Administrador-pontos',
						component: () => import('@/views/administrador/PontosComponent.vue')
					},
				]
				}
			

	]
});

export default router;

