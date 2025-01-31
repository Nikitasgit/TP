import { TLanguage } from "@/types/filtersType";
import { getMovieById, getMovieData, searchMovies } from "@api/moviesApi";
import { getUsers } from "@api/usersApi";
import { useQuery } from "@tanstack/react-query";

export function useMovies({
  result,
  page,
  language,
}: {
  result: string;
  page: number;
  language: TLanguage;
}) {
  return useQuery({
    queryFn: () => getMovieData({ result, page, language }),
    queryKey: ["movies", page, result, language],
  });
}
export function useMovieById({
  id,
  language,
}: {
  id: number;
  language: TLanguage;
}) {
  return useQuery({
    queryFn: () => getMovieById({ id, language }),
    queryKey: ["movies", id, language],
  });
}

export function useSearchMovie({
  query,
  page,
  language,
}: {
  query: string;
  page: number;
  language: TLanguage;
}) {
  return useQuery({
    queryKey: ["movies", query, page, language],
    queryFn: () => searchMovies({ query, page, language }),
    enabled: !!query,
  });
}

export function useUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
}
