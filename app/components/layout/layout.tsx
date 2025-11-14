import { GlobalProvider } from '@store/context/global.context';
import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();
type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>{children}</GlobalProvider>
    </QueryClientProvider>
  );
};
