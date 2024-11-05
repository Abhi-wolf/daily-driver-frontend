export function LargeSpinner() {
  return (
    <div className="w-full h-full flex space-x-2 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="size-7 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="size-7 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="size-7 bg-neutral-900 rounded-full animate-bounce" />
    </div>
  );
}

export function MediumSpinner() {
  return (
    <div className="w-full h-full flex space-x-2 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="size-5 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="size-5 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="size-5 bg-neutral-900 rounded-full animate-bounce" />
    </div>
  );
}

export function SmallSpinner() {
  return (
    <div className="flex space-y-6 space-x-2 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="size-3 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="size-3 bg-neutral-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="size-3 bg-neutral-900 rounded-full animate-bounce" />
    </div>
  );
}
