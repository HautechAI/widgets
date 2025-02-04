import useLogic from './logic';
import S from './style';
import type { Props } from './types';
import { Skeleton } from '@mui/material';

const Stack = (props: Props) => {
    const { canShow, imageUrl, onSelect } = useLogic(props);

    const renderImage = () => {
        if (!canShow || !imageUrl) return <Skeleton variant="rectangular" height={256} width="100%" />;

        return (
            <S.ImageContainer onClick={onSelect}>
                <S.Image src={imageUrl} />
                <S.ImageOverlay>
                    <S.ImageOverlayContent>
                        <S.ImageOverlayBackground />
                        <S.ImageOverlayText color="white" fontWeight="bold" variant="body1">
                            Edit
                        </S.ImageOverlayText>
                    </S.ImageOverlayContent>
                </S.ImageOverlay>
            </S.ImageContainer>
        );
    };

    return <S.Container>{renderImage()}</S.Container>;
};

export default Stack;
