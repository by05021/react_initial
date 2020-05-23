import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import { LoginWarp, LoginContent } from './style';
import { set } from '@/utils/helper';

class Login extends Component<any, any> {
    render() {
        return (
            <LoginWarp>
                <LoginContent>
                    <h2>欢迎登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入您的用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入您的密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </LoginContent>
            </LoginWarp>
        );
    }

    //登陆
    onFinish = (values: any) => {
        console.log(values);
        const { location: { query }, dispatch } = this.props;
        dispatch({
            type: 'login/setToken',
            payload: '123',
        });
        if (query.redirect) {
            set('account_type', 'user');
            set('token', '123');
            window.location.href = query.redirect;
        } else {
            set('account_type', 'user');
            set('token', '123');
            history.push('/index');
        }
    };
}

export default connect(({ login }: any) => ({
    token: login.token,
}))(Login);
