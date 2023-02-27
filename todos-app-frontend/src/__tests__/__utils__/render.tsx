import {
  render as originalRender,
  type RenderOptions,
} from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type RenderElement = Parameters<typeof originalRender>[0];

const testQueryClient = new QueryClient();

const wrapper: RenderOptions['wrapper'] = ({ children }) => (
  <ChakraProvider>
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  </ChakraProvider>
);

export const render = (element: RenderElement, options: RenderOptions = {}) =>
  originalRender(element, { wrapper, ...options });
