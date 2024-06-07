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
    {
        path: '/profile',
        component: <pages.Profile />,
        layout: layouts.Default,
    },
    {
        path: '/profile/information',
        component: <pages.UserInformation />,
        layout: layouts.Default,
    },
    {
        path: '/profile/orders',
        component: <pages.ClientOrder />,
        layout: layouts.Default,
    },
    {
        path: '/cart',
        component: <pages.Cart />,
        layout: layouts.Default,
    },
    {
        path: '/delivery',
        component: <pages.Delivery />,
        layout: layouts.Default,
    },
    {
        path: '/admin/client',
        component: <pages.AdminClient />,
        layout: layouts.Admin,
    },
    {
        path: '/admin/products',
        component: <pages.AdminProduct />,
        layout: layouts.Admin,
    },
    {
        path: '/admin/order',
        component: <pages.AdminOrder />,
        layout: layouts.Admin,
    },
    {
        path: '/admin/product',
        component: <pages.AdminProductDetails />,
        layout: layouts.Admin,
    },
];

export default routes;
