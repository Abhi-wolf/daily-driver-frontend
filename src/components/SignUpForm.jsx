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
import { useUserStore } from "../store";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/auth/useSignUp";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useSignUp();

  const onSubmit = async (data) => {
    signUp(
      { data },
      {
        onSuccess: (data) => {
          console.log("user = ", data);
          if (data?.user?.email) {
            setUser(data?.user);
            toast.success("Signed up successfully");
            navigate("/");
          }
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Card className="mx-auto min-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your name, email and password to signup.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Full Name</Label>
            <div>
              <Input
                id="name"
                type="name"
                disabled={isSigningUp}
                {...register("name", { required: true })}
              />

              {errors.name && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Name is required.
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div>
              <Input
                id="email"
                type="email"
                disabled={isSigningUp}
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />

              {errors.email && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Email is required.
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div>
              {/* todo : implement pass strength checker */}
              <div className="flex relative ">
                <Input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  className="w-full"
                  disabled={isSigningUp}
                  {...register("password", { required: true })}
                />

                <span
                  className="absolute right-3 top-3 cursor-pointer hover:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSigningUp}>
            Sign up
          </Button>
          {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/login" className="underline">
            login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
