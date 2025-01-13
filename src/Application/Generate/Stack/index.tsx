import Actions from './Actions';
import { CircularProgress, IconButton } from '@mui/material';
import { Loader } from '@app/web-ui';
import { MaterialSymbol } from 'react-material-symbols';
import useLogic from './logic';
import S from './style';
import type { Props } from './types';
import UndoRedo from './UndoRedo';

const Stack = (props: Props) => {
    const {
        canRedo,
        canUndo,
        canUpscale,
        image,
        imageUrl,
        onDownload,
        onUpscale,
        redo,
        retouchActions,
        running,
        stack,
        undo,
    } = useLogic(props);
    if (!image || !imageUrl) return <Loader />;

    const renderImage = () => {
        if (!imageUrl) return <CircularProgress size={48} />;

        return <S.Image src={imageUrl} />;
    };
    return (
        <S.Container>
            <S.Header>
                <IconButton onClick={props.onDeselectStack}>
                    <MaterialSymbol icon="arrow_back_ios" size={24} />
                </IconButton>
                {running && <CircularProgress size={24} />}
            </S.Header>
            <S.Body>
                <UndoRedo canRedo={canRedo} canUndo={canUndo} redo={redo} undo={undo} />
                {renderImage()}
                <Actions
                    disabled={running}
                    canUpscale={canUpscale}
                    image={image}
                    onDownload={onDownload}
                    onUpscale={onUpscale}
                    retouchActions={retouchActions}
                    stack={stack}
                    widgetProps={props.widgetProps}
                />
            </S.Body>
        </S.Container>
    );
};

export default Stack;
