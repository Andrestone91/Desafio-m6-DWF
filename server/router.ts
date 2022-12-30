import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/nuevo-juego', component: 'nuevo-juego' },
    { path: '/ingresar-sala', component: 'juego-creado' },
    { path: '/code', component: 'code-share' },
    { path: '/ready', component: 'test-connect' },
    { path: '/full-room', component: 'full-room' },
    { path: '/instructions', component: 'reglas-intru' },
    { path: '/instructions-2', component: 'reglas-intru2' },
    { path: '/waiting', component: 'waiting-player' },
    { path: '/waiting-2', component: 'waiting-player2' },
    { path: '/play', component: 'Play-game' },
    { path: '/play-2', component: 'Play-game2' },
    { path: '/show-hands', component: 'show-hands' },
    { path: '/show-hands-2', component: 'show-hands2' },
    { path: '/result', component: 'result-game' },
    { path: '/result-2', component: 'result-game2' }
]);
