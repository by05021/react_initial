import {
    HomeOutlined,
    CopyOutlined,
    OrderedListOutlined,
} from '@ant-design/icons';

const siderMenuList = {
    namespace: 'siderMenuList',
    state: {
        siderMenuList: [
            {
                path: '/welcome',
                title: '欢迎登录',
                icon: HomeOutlined,
            },
            {
                path: '/order',
                title: '订单管理',
                icon: CopyOutlined,
                routes: [
                    {
                        path: '/order/list',
                        title: '订单列表',
                        icon: OrderedListOutlined,
                    },
                ],
            }
        ]
    },
    effects: {
        * setMe({payload}: any, {put}: any) {
            yield put({
                type: 'saveme',
                payload: payload,
            });
        },
    },
    reducers: {
        saveme(state: any, action: any) {
            return {
                data: action.payload,
            }
        },
    },
};

export default siderMenuList;
