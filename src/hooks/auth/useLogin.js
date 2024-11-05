import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../features/apiAuth";

export function useLogin() {
  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: loginApi,
  });

  return { login, isPending, isSuccess };
}
