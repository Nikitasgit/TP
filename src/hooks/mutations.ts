import { addMovie, addUser, modifyUser, removeMovie } from "@api/usersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "store/useAuth";

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
export function useModifyUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: modifyUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
export function useAddUserMovie() {
  const { user, login } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMovie,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (user?.id === updatedUser.id) {
        login(updatedUser);
      }
    },
  });
}
export function useRemoveUserMovie() {
  const queryClient = useQueryClient();
  const { user, login } = useAuth();
  return useMutation({
    mutationFn: removeMovie,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (user?.id === updatedUser.id) {
        login(updatedUser);
      }
    },
  });
}
