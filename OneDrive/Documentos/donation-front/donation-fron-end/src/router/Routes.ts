import { createRouter, createWebHistory } from 'vue-router';
import { useUserAuthStore } from '@/stores/UserAuthStore';
import { UserType } from '@/models/User';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/Home.vue')
		},
		{
			path: '/doador',
			name: 'Doador',
			children: [
				{
					path: '/doador-ong-amazonia',
					name: 'Doador-ong-amazonia',
					component: () => import('@/views/doador/amazonia.vue')
				},
				{
					path: '/doador-ong-matogrosso',
					name: 'Doador-ong-matogrosso',
					component: () => import('@/views/doador/matogrosso.vue')
				},
				{
					path: '/doador-ong-riojaneiro',
					name: 'Doador-ong-riojaneiro',
					component: () => import('@/views/doador/riojaneiro.vue')
				},
				{
					path: '/doador-doacao',
					name: 'Doador-doacao',
					component: () => import('@/views/doador/doacao.vue')
				},
			],
				},
			

	]
});

router.beforeEach((to, _from, next) => {
	const requiredUserType = to.meta?.UserType;

	if (requiredUserType) {
		const user = useUserAuthStore().getUser();

		if (user != null) {
			if (user.userType === requiredUserType && user.userType != null && user.status) {
				next();
			} else {
				next({ name: 'AuthUser' });
			}
		}
	} else {
		next();
	}
});

export default router;

