/* eslint-disable react/prop-types */

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-6">
          {message || "Something went wrong. Please try again."}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            // onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
