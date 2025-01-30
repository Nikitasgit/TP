import Button from "@atoms/Button/Button";
import Title from "@atoms/Title/Title";
import { useNavigate } from "react-router-dom";
import "./NotFoundDialog.scss";
const NotFoundDialog = () => {
  const navigate = useNavigate();

  const handleClick = (path: string | number) => {
    if (typeof path === "number") {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="not-found">
      <Title label="Oops, Vous vous êtes perdu!" />

      <div className="not-found_buttons">
        <Button
          label="Retourner à l'accueil"
          onClick={() => handleClick("/")}
        />
        <Button
          label="Retourner à la dernière page"
          onClick={() => handleClick(-1)}
        />
      </div>
    </div>
  );
};

export default NotFoundDialog;
