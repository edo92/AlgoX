import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

// const Dashboard = React.lazy(() => import('./Views/Dashboard'));
// const Analize = React.lazy(() => import('./Views/Analize'));
const Draft = React.lazy(() => import('./Views/Draft'));
const ML = React.lazy(() => import('./Views/ML'));

const routes = [
    // { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    // { path: '/analize', exact: true, name: 'Analize', component: Analize },
    { path: '/draft', exact: true, name: 'Draft', component: Draft },
    { path: '/ml', exact: true, name: 'ML', component: ML }
];

export default routes;