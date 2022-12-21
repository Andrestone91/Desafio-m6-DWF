import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/nuevo-juegp', component: 'nuevo-juego' },
    { path: '/ingresar-sala', component: 'juego-creado' },
    { path: '/code', component: 'code-share' },
    { path: '/ready', component: 'test-connect' },
    { path: '/full-room', component: 'full-room' },
    { path: '/instructions', component: 'reglas-intru' },
    { path: '/instructions-2', component: 'reglas-intru2' },
    { path: '/waiting', component: 'waiting-player' },
    { path: '/waiting-2', component: 'waiting-player2' }
]);
