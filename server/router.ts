import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/nuevo-juegp', component: 'nuevo-juego' },
    { path: '/ingresar-sala', component: 'juego-creado' },
    { path: '/code', component: 'code-share' },
    { path: '/ready', component: 'test-connect' }
]);
