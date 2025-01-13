import S from './style';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <S.Container>
        <S.PageContainer>
            <Outlet />
        </S.PageContainer>
    </S.Container>
);

export default Layout;
