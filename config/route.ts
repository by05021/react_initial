import {
    HomeOutlined,
    CopyOutlined,
    OrderedListOutlined,
} from '@ant-design/icons';

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
                        icon: HomeOutlined,
                        component: '@/pages/welcome',
                    },
                    {
                        path: '/order',
                        title: '订单管理',
                        icon: CopyOutlined,
                        component: '@/pages/order/index',
                        routes: [
                            {
                                path: '/order',
                                redirect: '/order/list',
                            },
                            {
                                path: '/order/list',
                                title: '订单列表',
                                icon: OrderedListOutlined,
                                component: '@/pages/order/list/index',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default routes;
