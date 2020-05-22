import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { get } from '@/utils/helper';
import '@/pages/index.less';

interface SecurityLayoutState {
    isReady: boolean;
}

//全局安全Layout，可做登录验证之类操作
class SecurityLayout extends React.Component<SecurityLayoutState> {
    state: SecurityLayoutState = {
        isReady: false,
    };

    componentDidMount() {
        this.setState({
            isReady: true,
        });
    }

    render() {
        const { isReady } = this.state;
        const { children } = this.props;
        const queryString = stringify({
            redirect: window.location.href,
        });
        if (!isReady) {
            return <PageLoading/>;
        }
        if (!get('token') && window.location.pathname !== '/login') {
            return <Redirect to={`/login?${queryString}`}/>;
        }
        return children;
    }
}

export default SecurityLayout;
