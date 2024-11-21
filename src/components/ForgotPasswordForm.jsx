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
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/auth/useForgotPassword";

export default function ForgotpasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { forgotPassword, isPending } = useForgotPassword();

  const onSubmit = async (data) => {
    forgotPassword(
      { data },
      {
        onSuccess: () => {
          toast.success("If User is registered Email sent successfully");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Card className="mx-auto min-w-lg shadow-xl shadow-gray-400">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a link to reset your password.
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

          <Button type="submit" className="w-full" disabled={isPending}>
            Send mail
          </Button>
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
