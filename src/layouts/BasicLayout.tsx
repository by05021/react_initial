import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Menu, Result, Button } from 'antd';
import { history, Link, connect } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { HeaderTitle, Logo } from '@/layouts/layouts.style';
import logo from '@/assets/images/logo.svg';
import Avatar from '@/components/GlobalHeader/Avatar';
import { get } from '@/utils/helper';

const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;

const Account = (props: any) => {
    const { siderMenuList, location: { pathname }, children } = props;
    const account_type = get('account_type');
    const num = pathname.indexOf('/', 1) >= 0 ? pathname.indexOf('/', 1) : pathname.length;
    const openKeys = pathname.substring(0, num);
    let isShow = false;
    for (let i = 0; i < siderMenuList.length; i++) {
        if (siderMenuList[i].path === openKeys) {
            for (let j = 0; j < siderMenuList[i].authority.length; j++) {
                if (account_type === siderMenuList[i].authority[j]) {
                    isShow = true;
                }
            }
        }
    }
    if (isShow || pathname === '/') {
        return (
            <Fragment>
                <div className="ant-pro-page-header-wrap-page-header-warp">
                    <div className="ant-pro-grid-content">
                        <div className="ant-page-header has-breadcrumb ant-page-header-ghost">
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to="/">首页</Link>
                                </Breadcrumb.Item>
                                {siderMenuList.map((item: any, i: any) => {
                                    if (item.routes && openKeys === item.path) {
                                        return (
                                            <Fragment key={i}>
                                                <Breadcrumb.Item>
                                                    {item.title}
                                                </Breadcrumb.Item>
                                                {item.routes.map((data: any, k: any) => {
                                                        if (pathname === data.path) {
                                                            return (
                                                                <Breadcrumb.Item
                                                                    key={k}
                                                                >
                                                                    {data.title}
                                                                </Breadcrumb.Item>
                                                            );
                                                        }
                                                    },
                                                )}
                                            </Fragment>
                                        );
                                    } else if (pathname === item.path) {
                                        return (
                                            <Breadcrumb.Item key={i}>
                                                {item.title}
                                            </Breadcrumb.Item>
                                        );
                                    }
                                })}
                            </Breadcrumb>
                            <div className="ant-page-header-heading">
                                <HeaderTitle>
                                    {siderMenuList.map((item: any, i: any) => {
                                        if (item.routes && openKeys === item.path) {
                                            return (
                                                <Fragment key={i}>
                                                    {item.routes.map((data: any, k: any) => {
                                                            if (pathname === data.path) {
                                                                return (
                                                                    <Fragment key={k}>
                                                                        {data.title}
                                                                    </Fragment>
                                                                );
                                                            }
                                                        },
                                                    )}
                                                </Fragment>
                                            );
                                        } else if (pathname === item.path) {
                                            return (
                                                <Fragment key={i}>
                                                    {item.title}
                                                </Fragment>
                                            );
                                        }
                                    })}
                                </HeaderTitle>
                            </div>
                        </div>
                    </div>
                </div>
                <Content>
                    {children}
                </Content>
            </Fragment>
        );
    } else {
        return (
            <Result
                status="404"
                title="404"
                subTitle="抱歉，您访问的页面不存在"
                extra={<Button type="primary" onClick={() => history.push('/')}>返回首页</Button>}
            />
        );
    }
};

//全局页面Layout
class BasicLayout extends Component<any> {
    state: any = {
        collapsed: false,
    };

    render() {
        const { location: { pathname }, siderMenuList } = this.props;
        const { collapsed } = this.state;
        let str = pathname;
        const openKeys = str.substring(0, str.indexOf('/', 1));
        const account_type = get('account_type');
        return (
            <Layout className="ant-pro-basicLayout">
                <Sider
                    className='fix-sider-bar'
                    width={256}
                    collapsed={collapsed}
                    theme="light"
                >
                    <Logo>
                        <a href="">
                            <img src={logo} alt=""/>
                            {!collapsed && <h1>Ant Design Pro</h1>}
                        </a>
                    </Logo>
                    <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={[openKeys]}
                        style={{ padding: '16px 0' }}
                    >
                        {siderMenuList.map((item: any) => {
                            if (item.routes) {
                                return item.authority.map((value: any) => {
                                    if (value === account_type) {
                                        return (
                                            <SubMenu
                                                key={item.path}
                                                icon={<item.icon/>}
                                                title={item.title}
                                            >
                                                {item.routes.map((data: any) => {
                                                    return (
                                                        <Menu.Item
                                                            key={data.path}
                                                            icon={<data.icon/>}
                                                            onClick={() => this.jumpTo(data.path)}
                                                        >
                                                            {data.title}
                                                        </Menu.Item>
                                                    );
                                                })}
                                            </SubMenu>
                                        );
                                    }
                                });
                            } else {
                                return item.authority.map((value: any) => {
                                    if (value === account_type) {
                                        return (
                                            <Menu.Item
                                                key={item.path}
                                                icon={<item.icon/>}
                                                onClick={() => this.jumpTo(item.path)}
                                            >
                                                {item.title}
                                            </Menu.Item>
                                        );
                                    }
                                });
                            }
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ position: 'relative', paddingLeft: collapsed ? 80 : 256 }}>
                    <Header/>
                    <Header style={{
                        padding: 0,
                        zIndex: 9,
                        position: 'fixed',
                        top: 0,
                        width: `calc(100% - ${collapsed ? 80 : 256}px)`,
                    }}>
                        <div className="ant-pro-global-header">
                            <div
                                className="ant-pro-global-header-trigger"
                                onClick={this.openCollapsed}
                            >
                                {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            </div>
                            <div style={{ flex: '1 1 0%' }}/>
                            <Avatar/>
                        </div>
                    </Header>
                    <Layout>
                        {Account(this.props)}
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }

    //点击菜单跳转路由
    jumpTo = (path: any) => {
        history.push(path);
    };

    //展开/关闭，右侧菜单
    openCollapsed = () => {
        this.setState((state: any) => {
            return {
                collapsed: !state.collapsed,
            };
        });
    };
}

export default connect(({ siderMenuList }: any) => ({
    siderMenuList: siderMenuList.siderMenuList,
}))(BasicLayout);
