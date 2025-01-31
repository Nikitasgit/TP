import { TLanguage } from "@/types/filtersType";
import axios from "axios";
const url = "https://api.themoviedb.org/3/";
const token = import.meta.env.VITE_API_TOKEN_MOVIES;

export const getMovieData = async ({
  result,
  page,
  language,
}: {
  result: string;
  page: number;
  language: TLanguage;
}) => {
  try {
    const response = await axios.get(`${url}movie/${result}?&page=${page}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getMovieById = async ({
  id,
  language,
}: {
  id: number;
  language: TLanguage;
}) => {
  try {
    const response = await axios.get(`${url}movie/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language,
        include_adult: false,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const searchMovies = async ({
  query,
  page,
  language,
}: {
  query: string;
  page: number;
  language: TLanguage;
}) => {
  try {
    const response = await axios.get(`${url}search/movie`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
        language,
        include_adult: false,
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
