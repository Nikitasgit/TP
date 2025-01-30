import Title from "@atoms/Title/Title";
import "./Modal.scss";
import Button from "@atoms/Button/Button";
import Text from "@atoms/Text/Text";
import { IModalProps } from "./Modal.props";
const Modal: React.FC<IModalProps> = ({
  title,
  text,
  buttonLabel,
  onClose,
  onClick,
}) => {
  return (
    <div className="modal">
      <Title label={title} />
      <Text text={text} />
      <>
        <Button label="Annuler" onClick={onClose} />
        <Button label={buttonLabel} onClick={onClick} />
      </>
    </div>
  );
};

export default Modal;
