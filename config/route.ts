const routes: any = [
    {
        path: '/login',
        component: '@/pages/login/index',
        title: '登录',
    },
    {
        path: '/',
        component: '@/layouts/SecurityLayout',
        routes: [
            {
                path: '/',
                component: '@/layouts/BasicLayout',
                routes: [
                    {
                        path: '/',
                        redirect: '/welcome',
                    },
                    {
                        path: '/welcome',
                        title: '欢迎登录',
                        component: '@/pages/welcome',
                    },
                    {
                        path: '/order',
                        title: '订单管理',
                        component: '@/pages/order/index',
                        routes: [
                            {
                                path: '/order',
                                redirect: '/order/list',
                            },
                            {
                                path: '/order/list',
                                title: '订单列表',
                                component: '@/pages/order/list/index',
                            },
                        ],
                    },
                    {
                        component: '@/pages/404',
                    },
                ],
            },
            {
                component: '@/pages/404',
            },
        ],
    },
    {
        component: '@/pages/404',
    },
];

export default routes;
