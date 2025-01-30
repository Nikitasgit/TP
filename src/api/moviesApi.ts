import axios from "axios";
const MOVIES_API_URL = "https://api.themoviedb.org/3/";
const token = import.meta.env.VITE_API_TOKEN_MOVIES;

export const getMovieData = async ({
  result,
  page,
}: {
  result: string;
  page: number;
}) => {
  try {
    const response = await axios.get(
      `${MOVIES_API_URL}movie/${result}?&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          language: "fr-FR",
          include_adult: false,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getMovieById = async (id: number) => {
  try {
    const response = await axios.get(`${MOVIES_API_URL}movie/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        language: "fr-FR",
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
}: {
  query: string;
  page: number;
}) => {
  try {
    const response = await axios.get(`${MOVIES_API_URL}search/movie`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
        language: "fr-FR",
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
