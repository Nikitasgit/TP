import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.scss";
import { useAuth } from "store/useAuth";
import Title from "@atoms/Title/Title";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      {user && <Title label={`Hello, ${user?.userName} !`} />}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Accueil
      </NavLink>
      {user ? (
        <>
          <NavLink
            to={`/users/${user.id}/movies`}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Mes films
          </NavLink>
          <NavLink
            to={`/users/${user.id}/settings`}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Mon profil
          </NavLink>
          <NavLink
            to={"/"}
            onClick={handleLogout}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Se déconnecter
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to={`/users/newAccount`}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Créer un profil
          </NavLink>
          <NavLink
            to={`/login`}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Se connecter
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
