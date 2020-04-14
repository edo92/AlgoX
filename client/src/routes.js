import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./Views/Dashboard'));
const Draft = React.lazy(() => import('./Views/Draft'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/draft', exact: true, name: 'draft', component: Draft },
];

export default routes;