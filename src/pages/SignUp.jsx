import { Navigate } from "react-router";
import { SignUpForm } from "../components/SignUpForm";
import { useUserStore } from "../store";

function SignUp() {
  const { user } = useUserStore();

  if (user?.email) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-[90vh] w-full flex justify-center items-center">
      <SignUpForm />
    </section>
  );
}

export default SignUp;
