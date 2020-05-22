import styled from 'styled-components';

export const HeaderTitle = styled.div`
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
`;

export const Logo = styled.div`
    position: relative;
    padding: 0 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;
    a{
        display: flex;
        align-items: center;
        height: 64px;
    }
    img{
        display: inline-block;
        height: 32px;
        vertical-align: middle;
    }
    h1{
        display: inline-block;
        margin: 0 0 0 12px;
        color: #000;
        font-weight: 600;
        font-size: 20px;
        vertical-align: middle;
        animation: fade-in;
        animation-duration: .3s;
    }
`;
