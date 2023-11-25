import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isPending: isSignUp } = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      toast.success(
        `Account successfully created Please verify the new account from the ${user.user.user_metadata.fullName} email address`
      );
    },
  });

  return { signUp, isSignUp };
}
