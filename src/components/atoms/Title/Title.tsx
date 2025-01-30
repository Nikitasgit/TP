import { ITitle } from "./Title.props";
import "./Title.scss";
const Title: React.FC<ITitle> = ({ label, border }) => {
  return (
    <h2
      className="my-title"
      style={{ border: !border ? "none" : "1px solid black" }}
    >
      {label}
    </h2>
  );
};

export default Title;
