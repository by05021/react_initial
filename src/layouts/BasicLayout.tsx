import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { history, Link } from 'umi';
import route from '../../config/route';
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
        const {
            children,
            location: { pathname },
        } = this.props;
        const { collapsed } = this.state;
        let str = pathname;
        const OpenKeys = str.substring(0, str.indexOf('/', 1));
        const routes = route[1].routes[0].routes;
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
                        defaultOpenKeys={[OpenKeys]}
                        style={{ padding: '16px 0' }}
                    >
                        {routes.map((item: any) => {
                            if (item.title && item.routes) {
                                return (
                                    <SubMenu
                                        key={item.path}
                                        icon={<item.icon/>}
                                        title={item.title}
                                    >
                                        {item.routes.map((data: any) => {
                                            if (data.title) {
                                                return (
                                                    <Menu.Item
                                                        key={data.path}
                                                        icon={<data.icon/>}
                                                        onClick={() => this.jumpTo(data.path)}
                                                    >
                                                        {data.title}
                                                    </Menu.Item>
                                                );
                                            }
                                        })}
                                    </SubMenu>
                                );
                            } else if (item.title && !item.routes) {
                                return (
                                    <Menu.Item
                                        key={item.path}
                                        icon={<item.icon/>}
                                        title={item.title}
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
                                onClick={this.handerCollapsed}
                            >
                                {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div className="ant-pro-page-header-wrap-page-header-warp">
                            <div className="ant-pro-grid-content">
                                <div className="ant-page-header has-breadcrumb ant-page-header-ghost">
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to="/">首页</Link>
                                        </Breadcrumb.Item>
                                        {routes.map((item: any, i: any) => {
                                            if (item.title && item.routes && OpenKeys === item.path) {
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
                                            } else if (item.title && pathname === item.path) {
                                                return (
                                                    <Breadcrumb.Item key={i}>
                                                        {item.title}
                                                    </Breadcrumb.Item>
                                                );
                                            }
                                        })}
                                    </Breadcrumb>
                                    <div className="ant-page-header-heading">
                                        <HeaderTitle>TITLE</HeaderTitle>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>{children}</div>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }

    //点击菜单跳转路由
    jumpTo = (path: any) => {
        history.push(path);
    };

    //收方菜单
    handerCollapsed = () => {
        this.setState((state: any) => {
            return {
                collapsed: !state.collapsed,
            };
        });
    };
}

export default BasicLayout;
