export default function WorkInProgressMessage() {
  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow-md">
      <div className="flex items-center">
        <svg
          className="h-6 w-6 text-blue-500 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h2 className="text-lg font-semibold text-blue-800">
            Work in Progress
          </h2>
          <p className="mt-2 text-sm text-blue-600">
            We&apos;re currently working on enhancing this page. The features
            and content here are not yet complete. Please check back soon for
            updates. We appreciate your patience as we improve your experience.
          </p>
        </div>
      </div>
    </div>
  );
}
