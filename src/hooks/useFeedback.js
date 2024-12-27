import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const apiURL = import.meta.env.VITE_FEEDLYTIC_API_URL;
const apiKEY = import.meta.env.VITE_FEEDLYTIC_API_KEY;

export function useAddFeedback() {
  const { mutate: addFeedback, isPending } = useMutation({
    mutationFn: async ({ input }) => {
      console.log(apiKEY, apiURL);

      const res = await axios.post(`${apiURL}/feedbacks`, input, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKEY}`,
        },
      });

      console.log("RESPONSE = ", res);

      return res;
    },
    onSuccess: () => {
      toast.success("Feedback added successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { addFeedback, isPending };
}
