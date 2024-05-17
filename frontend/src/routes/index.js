import * as layouts from '../layouts';
import * as pages from '../pages';

const routes = [
    {
        path: '/',
        component: <pages.Home />,
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
    {
        path: '/about',
        component: <pages.About />,
        layout: layouts.Default,
    },
    {
        path: '/contact',
        component: <pages.Contact />,
        layout: layouts.Default,
    },
    {
        path: '/perfume',
        component: <pages.Perfume />,
        layout: layouts.Default,
    },
    {
        path: '/search',
        component: <pages.Search />,
        layout: layouts.Default,
    },
    {
        path: '/product/:id',
        component: <pages.Product />,
        layout: layouts.Default,
    },
];

export default routes;
