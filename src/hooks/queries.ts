import { getMovieById, getMovieData, searchMovies } from "@api/moviesApi";
import { getUsers } from "@api/usersApi";
import { useQuery } from "@tanstack/react-query";
export function useMovies({ result, page }: { result: string; page: number }) {
  return useQuery({
    queryFn: () => getMovieData({ result, page }),
    queryKey: ["movies", page, result],
  });
}
export function useMovieById(id: number) {
  return useQuery({
    queryFn: () => getMovieById(id),
    queryKey: ["movies", id],
  });
}

export function useSearchMovie({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => searchMovies({ query, page }),
    enabled: !!query,
  });
}

export function useUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
}
