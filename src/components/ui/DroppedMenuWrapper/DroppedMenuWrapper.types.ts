export interface ActionType {
  id: string;
  label: string;
  action: () => void;
}

export type ShowMoreOptionsProps = {
  name: string;
  title: string;
  actions: ActionType[];
};

export type DroppedMenuWrapperProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  title: string;
};
