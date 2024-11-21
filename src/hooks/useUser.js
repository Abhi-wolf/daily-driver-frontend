import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  updateProfile as updateProfileApi,
} from "../features/apiUser";

export function useGetUserProfile() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserProfile(),
  });

  return { data, isPending, isError, error };
}

export function useUpdateUserProfile() {
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: updateProfileApi,
  });

  return { updateProfile, isUpdatingProfile };
}
