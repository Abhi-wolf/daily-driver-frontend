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
import { useEffect, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserStore } from "../store";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/auth/useSignUp";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { signUp, isSigningUp } = useSignUp();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    signUp(
      { data },
      {
        onSuccess: (data) => {
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

  const evaluatePasswordStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[@$!%*?&]/.test(value)) score++;

    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Very Weak";
    }
  };

  const password = watch("password");

  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(password || ""));
  }, [password]);

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
                {...register("name", { required: "Name is required" })}
              />

              {errors.name && (
                <p className="text-red-500 text-xs pl-2 pt-1">
                  {errors.name.message}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs pl-2 pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div>
              <div className="flex relative ">
                <Input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  className="w-full"
                  disabled={isSigningUp}
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
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
                <p className="text-red-500 text-xs pl-2 pt-1">
                  {errors.password.message}
                </p>
              )}

              {passwordStrength && password && (
                <p
                  className={`text-xs mt-1 mx-2 flex justify-between items-center `}
                >
                  <span className="text-gray-500">Strength </span>
                  <span
                    className={`${
                      passwordStrength === "Weak"
                        ? "text-red-500"
                        : passwordStrength === "Fair"
                        ? "text-yellow-500"
                        : passwordStrength === "Good"
                        ? "text-blue-500"
                        : passwordStrength === "Strong"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {passwordStrength}
                  </span>
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => reset()}>
            Reset Form
          </Button>
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
