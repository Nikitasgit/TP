import Nav from "@organisms/Nav/Nav";
import FavouriteMovies from "@pages/FavouriteMovies";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Movie from "@pages/Movie";
import NotFound from "@pages/NotFound";
import UserSettings from "@pages/UserSettings";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/users/:userId/movies" element={<FavouriteMovies />} />
        <Route path="/users/:userId/settings" element={<UserSettings />} />
        <Route path="/users/newAccount" element={<UserSettings />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
