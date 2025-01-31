import { addMovie, addUser, modifyUser, removeMovie } from "@api/usersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "store/useAuth";
import { IUser } from "../types/userType";

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
  const { user, login } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: modifyUser,
    onSuccess: (updatedUser: IUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (user?.id === updatedUser.id) {
        login(updatedUser);
      }
    },
  });
}
export function useAddUserMovie() {
  const { user, login } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMovie,
    onSuccess: (updatedUser: IUser) => {
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
