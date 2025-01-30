import Button from "@atoms/Button/Button";
import TextField from "@atoms/TextField/TextField";
import { useUsers } from "@hooks/queries";
import { FormEvent, useState } from "react";
import { useAuth } from "store/useAuth";
import { useNavigate } from "react-router-dom";
import Title from "@atoms/Title/Title";
import { LinearProgress } from "@mui/material";
import AlertMessage from "@molecules/AlertMessage/AlertMessage";

const LoginForm = () => {
  const { data: users, isLoading } = useUsers();
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = users?.find((user) => user.email === email);
    if (currentUser) {
      login(currentUser);
      setIsError(false);
      navigate("/");
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <form onSubmit={(e) => handleLogin(e)}>
          <Title label="Se connecter" />
          <TextField
            label="Votre adresse email"
            placeholder={"Berenice_Pfeffer21@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
          />
          <Button label="Se connecter" />
        </form>
      )}
      {isError && (
        <AlertMessage
          message="Aucune adresse email ne correspond, veuillez réessayer"
          isErrorMessage
        />
      )}
    </>
  );
};

export default LoginForm;
