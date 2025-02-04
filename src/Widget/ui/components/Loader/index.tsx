import { CircularProgress } from '@mui/material';
import S from './style';
import { Props } from './types';

export const Loader = (props: Props) => (
    <S.Container>
        <CircularProgress />
        {props.text && <S.Text variant="h6">{props.text}</S.Text>}
    </S.Container>
);
