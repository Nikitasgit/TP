import axios from "axios";
import { IUser } from "types/userType";
const token = import.meta.env.VITE_API_TOKEN_USERS;
const USERS_API_URL = `https://${token}.mockapi.io/api/users`;

export const getUsers = async () => {
  try {
    const response = await axios.get<IUser[]>(USERS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addUser = async (newUser: IUser) => {
  try {
    const response = await axios.post<IUser>(USERS_API_URL, newUser);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const modifyUser = async (user: IUser) => {
  try {
    const response = await axios.put(`${USERS_API_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const addMovie = async ({
  movieId,
  user,
}: {
  movieId: number;
  user: IUser;
}) => {
  try {
    const updatedUser = {
      ...user,
      movies: [...user.movies, movieId],
    };
    const response = await axios.put(
      `${USERS_API_URL}/${user.id}`,
      updatedUser
    );

    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
export const removeMovie = async ({
  movieId,
  user,
}: {
  movieId: number;
  user: IUser;
}) => {
  try {
    const updatedUser = {
      ...user,
      movies: user.movies?.filter((movie) => movie !== movieId),
    };

    const response = await axios.put(
      `${USERS_API_URL}/${user.id}`,
      updatedUser
    );

    return response.data;
  } catch (error) {
    console.error("Error removing movie:", error);
    throw error;
  }
};
