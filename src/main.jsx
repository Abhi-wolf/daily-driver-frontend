import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast, Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.jsx";
import DevAlert from "./components/DevAlert.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
      retry: 2,
      staleTime: 1000 * 60 * 10, // data stays fresh for 10 minutes
      cacheTime: 1000 * 60 * 60, // cache lifespan
      refetchOnWindowFocus: false, // Avoid refetching when the window regains focus
      refetchOnReconnect: false, // Avoid refetching when network reconnects
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong : ${error?.message}`);
      }
    },
  }),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <DevAlert />
        <Toaster position="bottom-right" richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
