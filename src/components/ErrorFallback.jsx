/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <div className="max-w-md p-8 shadow-lg rounded-xl bg-white">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. Don’t worry, it happens to the best of us!
          {error?.message}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg shadow-md hover:bg-blue-50"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
