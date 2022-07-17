import { addDecorator } from '@storybook/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { MockedProvider } from '@apollo/client/testing';

addDecorator(Story => (
  <MemoryRouterProvider>
    <Story />
  </MemoryRouterProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
  },
};
