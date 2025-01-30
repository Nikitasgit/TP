export interface IModalProps {
  title: string;
  text: string;
  buttonLabel: string;
  onClose: () => void;
  onClick: () => void;
}
