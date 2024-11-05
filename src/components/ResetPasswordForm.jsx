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
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useResetPassword } from "../hooks/auth/useResetPassword";

export default function ResetPasswordForm() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { resetPassword, isPending } = useResetPassword();
  const { token } = useParams();

  const onSubmit = async (data) => {
    resetPassword(
      { data, token },
      {
        onSuccess: () => {
          toast.success("Password reset successfull");
          navigate("/login");
        },
        onError: (err) => {
          console.log(err.message);
        },
      }
    );
  };

  return (
    <Card className="mx-auto min-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter new password to reset your old password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
            </div>
            <div>
              <div className="flex relative ">
                <Input
                  type="password"
                  id="password"
                  className="w-full"
                  disabled={isPending}
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm pl-4 pt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
            </div>
            <div>
              <div className="flex relative ">
                <Input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  id="confirmpassword"
                  className="w-full"
                  disabled={isPending}
                  {...register("confirmpassword", {
                    required: true,
                    validate: (match) => {
                      const password = getValues("password");
                      return (
                        password === match ||
                        "Confirm password should be equal to password"
                      );
                    },
                  })}
                />

                <span
                  className="absolute right-3 top-3 cursor-pointer hover:text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
              </div>
              {errors.confirmpassword && (
                <p className="text-red-400 text-xs  pt-1">
                  {errors.confirmpassword?.message
                    ? errors?.confirmpassword?.message
                    : "Confirm password is required"}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
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
