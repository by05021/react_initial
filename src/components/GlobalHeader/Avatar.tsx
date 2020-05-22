import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { AvatarWarp, AvatarTime } from '@/components/GlobalHeader/style';
import logo from '@/assets/images/logo.svg';

const menu = (
    <Menu>
        <Menu.Item>
            <UserOutlined/>
            个人中心
        </Menu.Item>
        <Menu.Item>
            <SettingOutlined/>
            个人设置
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
            <LogoutOutlined/>
            退出登录
        </Menu.Item>
    </Menu>
);

const Avatar = () => {
    return (
        <AvatarWarp>
            <Dropdown overlay={menu}>
                <AvatarTime>
                    <div className='ant-avatar-sm'>
                        <img src={logo} alt=""/>
                    </div>
                    <span>Serati Ma</span>
                </AvatarTime>
            </Dropdown>
        </AvatarWarp>
    );
};

export default Avatar;
