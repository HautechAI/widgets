export interface Props {
    canRedo: boolean;
    canUndo: boolean;
    redo: () => Promise<void>;
    undo: () => Promise<void>;
}
