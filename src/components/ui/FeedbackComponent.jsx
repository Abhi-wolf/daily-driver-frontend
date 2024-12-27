/* eslint-disable react/prop-types */
import { useState } from "react";

const FeedbackForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: "feedback",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    }
    if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Here you would typically send the data to your server
      alert("Thank you for your submission!");
      onClose();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        How can we help?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="feedback">Feedback</option>
            <option value="bug">Bug Report</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief title"
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide more details"
            rows={4}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.description}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const FeedbackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 rounded-full  bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out flex gap-2 items-center justify-center px-2 py-1"
  >
    <span className="text-xs md:text-sm ">Feedback / Report Bug</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  </button>
);

export default function FeedbackComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && <FeedbackButton onClick={() => setIsOpen(true)} />}
      {isOpen && <FeedbackForm onClose={() => setIsOpen(false)} />}
    </>
  );
}
