import React from 'react';

const SignIn1 = React.lazy(() => import('./Views/Dashboard'));

const route = [
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: SignIn1 }
];

export default route;