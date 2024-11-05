import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../features/apiAuth";

export function useForgotPassword() {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
  });

  return { forgotPassword, isPending };
}
