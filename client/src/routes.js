import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./Views/Dashboard'));
const Analize = React.lazy(() => import('./Views/Analize'));
const Draft = React.lazy(() => import('./Views/Draft'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/analize', exact: true, name: 'Analize', component: Analize },
    { path: '/draft', exact: true, name: 'Draft', component: Draft },
];

export default routes;