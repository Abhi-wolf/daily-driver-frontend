import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../features/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,
  });

  return { signUp, isSigningUp };
}
