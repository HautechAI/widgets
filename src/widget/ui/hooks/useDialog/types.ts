export interface Props {
    actions: {
        label: string;
        onClick: () => void;
        variant?: 'contained' | 'outlined' | 'text';
    }[];
    description: string;
    title: string;
}
