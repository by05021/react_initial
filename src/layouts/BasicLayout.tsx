import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { history, Link, connect } from 'umi';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { HeaderTitle, Logo } from '@/layouts/layouts.style';

const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;

//全局页面Layout
class BasicLayout extends Component<any> {
    state: any = {
        collapsed: false,
    };

    render() {
        const { children, location: { pathname }, siderMenuList } = this.props;
        const { collapsed } = this.state;
        let str = pathname;
        const openKeys = str.substring(0, str.indexOf('/', 1));
        return (
            <Layout className="ant-pro-basicLayout">
                <Sider
                    width={256}
                    style={{ boxShadow: '2px 0 8px 0 rgba(29, 35, 41, 0.05)', zIndex: 10 }}
                    collapsed={collapsed}
                    theme="light"
                >
                    <Logo>logo</Logo>
                    <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={[pathname]}
                        defaultOpenKeys={[openKeys]}
                        style={{ padding: '16px 0' }}
                    >
                        {siderMenuList.map((item: any) => {
                            if (item.routes) {
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
                            } else {
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
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ position: 'relative' }}>
                    <Header style={{ padding: 0, zIndex: 9 }}>
                        <div className="ant-pro-global-header">
                            <div
                                className="ant-pro-global-header-trigger"
                                onClick={this.openCollapsed}
                            >
                                {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            </div>
                        </div>
                    </Header>
                    <Layout>
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
