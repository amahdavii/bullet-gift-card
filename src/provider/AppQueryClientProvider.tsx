"use client";

import { FC, PropsWithChildren } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  state?: DehydratedState;
}

const queryClient = new QueryClient();

const AppQueryClientProvider: FC<PropsWithChildren<Props>> = ({
  children,
  state,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default AppQueryClientProvider;
