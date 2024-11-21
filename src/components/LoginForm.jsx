import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useLogin } from "../hooks/auth/useLogin";
import { useUserStore } from "../store";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { login, isPending } = useLogin();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    login(
      { data },
      {
        onSuccess: (data) => {
          if (data?.user?.email) {
            setUser(data?.user);
            toast.success("Login successfull", data?.user?.email);
            navigate("/");
          }
        },
        onError: (err) => {
          toast.error(err.message);
          navigate("/login");
        },
      }
    );
  };

  return (
    <Card className="mx-auto min-w-lg  border-0">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                id="email"
                type="email"
                disabled={isPending}
                placeholder="m@example.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgotpassword"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              <div className="flex relative ">
                <Input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  className="w-full"
                  disabled={isPending}
                  {...register("password", {
                    required: true,
                  })}
                />

                <span
                  className="absolute right-3 top-3 cursor-pointer hover:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
