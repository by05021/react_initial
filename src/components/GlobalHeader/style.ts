import styled from 'styled-components';

export const AvatarWarp = styled.div`
    padding: 0 20px;
`;

export const AvatarTime = styled.div`
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    &:hover{
        background: rgba(0,0,0,.025);
    }
    .ant-avatar-sm {
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 50%;
        margin-right: 10px;
        img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    span{
        color: rgba(0,0,0,.65);
    }
`;
