export interface ToggleToolTipWrapperProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  tip: string;
}
