import { Waves } from "lucide-react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-secondary to-accent flex justify-center items-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(var(--primary), 0.1)"
            fillOpacity="1"
            d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Card className="w-full max-w-md bg-card/20 backdrop-filter backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-card p-3 rounded-full">
              <Waves className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-foreground mb-6">
            Welcome Back To
            <Link to="/main">
              <p className="underline underline-offset-2 decoration-wavy text-gray-600 hover:text-gray-500">
                TaskMaster
              </p>
            </Link>
          </h1>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;
