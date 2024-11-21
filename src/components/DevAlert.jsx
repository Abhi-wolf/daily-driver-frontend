/* eslint-disable react/prop-types */
"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";

export default function DevAlert({
  message = "This site is still in development. It may contain bugs or issues.",
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-0 top-1/4 z-50 transition-all duration-300 ease-in-out ${
        isExpanded ? "translate-x-0" : "translate-x-[calc(100%-2.5rem)]"
      }`}
    >
      <div className="flex items-stretch">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-b from-red-600 to-blue-200 text-white p-2 rounded-l-md focus:outline-none"
          aria-label={isExpanded ? "Collapse alert" : "Expand alert"}
        >
          {isExpanded ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
        <div className="w-64 bg-gradient-to-br from-red-600 to-blue-300 rounded-l-md shadow-lg overflow-hidden">
          <div className="p-4 bg-white bg-opacity-20 backdrop-blur-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-300 animate-pulse" />
                <h2 className="text-md font-semibold text-white">
                  Development Alert
                </h2>
              </div>
            </div>
            <p className="text-sm text-white leading-snug">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
