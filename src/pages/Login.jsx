import { Navigate } from "react-router";
import { LoginForm } from "../components/LoginForm";
import { useUserStore } from "../store";

function Login() {
  const { user } = useUserStore();

  if (user?.email) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-[90vh] w-full flex justify-center items-center">
      <LoginForm />
    </section>
  );
}

export default Login;
