import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isDev } from "@constants/env";
import ms from "ms";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: ms("3s"),
    },
  },
});

function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      {children}
      {isDev === true ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
}

export default Provider;
