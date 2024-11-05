import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../features/apiAuth";

export function useLogout() {
  const {
    mutate: logout,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: logoutApi,
  });

  return { logout, isPending, isSuccess };
}
