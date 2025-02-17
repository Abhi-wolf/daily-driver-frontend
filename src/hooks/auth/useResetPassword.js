import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../features/apiAuth";

export function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
  });

  return { resetPassword, isPending };
}
