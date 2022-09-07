import { ITheme } from "types/theme";

export interface StyledProps {
    isAccent?: boolean;
    isDefault?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

export interface CssProps {
    theme: ITheme
}

export interface Props extends StyledProps {
    children: React.ReactNode;
    onClick: () => void;
}