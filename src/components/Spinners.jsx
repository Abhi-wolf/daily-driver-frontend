/* eslint-disable react/prop-types */
// export function LargeSpinner() {
//   return (
//     <div className="w-full h-full flex space-x-2 justify-center items-center dark:invert">
//       <span className="sr-only">Loading...</span>
//       <div className="size-7 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
//       <div className="size-7 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
//       <div className="size-7 bg-neutral-900 rounded-full animate-bounce" />
//     </div>
//   );
// }

// export function MediumSpinner() {
//   return (
//     <div className="w-full h-full flex space-x-2 justify-center items-center dark:invert">
//       <span className="sr-only">Loading...</span>
//       <div className="size-5 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
//       <div className="size-5 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
//       <div className="size-5 bg-neutral-900 rounded-full animate-bounce" />
//     </div>
//   );
// }

// export function SmallSpinner() {
//   return (
//     <div className="flex space-y-6 space-x-2 justify-center items-center dark:invert">
//       <span className="sr-only">Loading...</span>
//       <div className="size-3 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
//       <div className="size-3 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
//       <div className="size-3 bg-neutral-900 rounded-full animate-bounce" />
//     </div>
//   );
// }
import { cn } from "@/lib/utils";

function Loader({ className, color = "currentColor" }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function SmallSpinner(props) {
  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <Loader className="w-6 h-6" {...props} />
    </div>
  );
}

export function MediumSpinner(props) {
  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <Loader className="w-12 h-12" {...props} />
    </div>
  );
}

export function LargeSpinner(props) {
  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <Loader className="w-20 h-20" {...props} />
    </div>
  );
}
