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
    { path: '/result-ganar', component: 'result-ganar' },
    { path: '/result-ganar-2', component: 'result-ganar2' },
    { path: '/result-perder', component: 'result-perder' },
    { path: '/result-perder-2', component: 'result-perder2' },
    { path: '/result-empate', component: 'result-empate' },
    { path: '/result-empate-2', component: 'result-empate2' },
]);
