import { IText } from "./Text.props";
import "./Text.scss";
const Text: React.FC<IText> = ({ text, className }) => {
  return <p className={className}>{text}</p>;
};

export default Text;
