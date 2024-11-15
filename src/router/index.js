import { createMemoryHistory, createRouter } from 'vue-router'
import SignUp from '@/components/SignUp.vue';
import ExplorePage from '@/components/ExplorePage.vue';

const routes = [
  { path: '/', name: 'SignUp', component: SignUp },
  { path: '/explore', name: 'ExplorePage', component: ExplorePage}
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;