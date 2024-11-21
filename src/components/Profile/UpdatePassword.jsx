/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateUserProfile } from "../../hooks/useUser";

function UpdatePassword() {
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateUserProfile = async (data) => {
    const { confirmPassword, ...newData } = data;

    try {
      updateProfile(
        { data: newData },
        {
          onSuccess: () => {
            toast.success("Your password has been successfully changed.");
          },
          onError: (err) => {
            console.error(err.message);
            toast.error(
              err?.message || "Failed to update password. Please try again"
            );
          },
        }
      );
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again");
    } finally {
      setIsChangingPassword(false);
      reset();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswordMatch = (value) => {
    const newPassword = watch("newPassword");
    return value === newPassword || "Passwords don't match";
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Password Settings</CardTitle>
        <CardDescription>
          Manage your account password here. We recommend using a strong, unique
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isChangingPassword ? (
          <form
            onSubmit={handleSubmit(updateUserProfile)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: validatePasswordMatch,
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={isUpdatingProfile}
              >
                Change Password
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChangingPassword(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setIsChangingPassword(true)}
            variant="outline"
            className="w-full"
          >
            <Lock className="mr-2 h-4 w-4" /> Change Password
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default UpdatePassword;
