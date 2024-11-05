import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4 sm:space-y-6 max-w-md">
        <div className="animate-bounce">
          <svg
            className="w-32 h-32 mx-auto text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground">
          Oops! The page you are looking for might have been removed or is
          temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
