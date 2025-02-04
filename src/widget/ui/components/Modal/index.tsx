import { Modal as MaterialModal } from '@mui/material';
import { Props } from './types';
import S from './style';

export const Modal = (props: Props) => (
    <MaterialModal onClose={props.onClose} open={props.open}>
        <S.Container>
            <S.ModalContainer>{props.children}</S.ModalContainer>
        </S.Container>
    </MaterialModal>
);
