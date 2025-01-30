import { IButton } from "./Button.props";
import "./Button.scss";

const Button: React.FC<IButton> = ({
  label,
  onClick,
  disabled,
  customColor,
}) => {
  return (
    <button
      className="my-button"
      style={{ background: customColor }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
