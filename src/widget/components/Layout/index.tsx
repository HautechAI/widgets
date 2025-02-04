import { PropsWithChildren } from "react";
import S from "./style";

const Layout: React.FC<PropsWithChildren> = (props) => (
  <S.Container>
    <S.PageContainer>{props.children}</S.PageContainer>
  </S.Container>
);

export default Layout;
