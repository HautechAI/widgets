import { Typography } from '@mui/material';
import useLogic from './logic';
import S from './style';
import type { Props } from './types';

const EmptyState = (props: Props) => {
    const {} = useLogic(props);
    return (
        <S.Container>
            <S.Image src="/empty-state.png" />
            <Typography color="primary" variant="h6">
                No images generated yet
            </Typography>
        </S.Container>
    );
};

export default EmptyState;
