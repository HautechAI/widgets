export interface Props {
    actions: { name: string; onClick: () => void | Promise<void> }[];
    disabled: boolean;
    icon: string;
    name: string;
}
