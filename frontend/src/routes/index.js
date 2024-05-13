import * as layouts from '../layouts';
import * as pages from '../pages';

const routes = [
    {
        path: '/',
        component: <div></div>,
        layout: layouts.Default,
    },
    {
        path: '/login',
        component: <pages.Login />,
        layout: null,
    },
    {
        path: '/register',
        component: <pages.SignUp />,
        layout: null,
    },
];

export default routes;
