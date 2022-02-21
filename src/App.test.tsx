import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import App from './App';
import 'regenerator-runtime/runtime';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: () => null,
    },
  },
});

const bitcoin = {
  id: 2471,
  issuePrice: null,
  issuePriceUsed: null,
  issueDate: null,
  source: null,
  name: 'BTC',
  fullName: 'Bitcoin',
  localFullName: 'Bitcoin',
  cmcUniqueId: 1,
  logo: 'https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/87496d50-2408-43e1-ad4c-78b47b448a6a.png',
  symbol: 'BTCUSDT',
  circulatingSupply: 18964456,
  maxSupply: 21000000,
  totalSupply: 18964456,
  volume: 23202923227.794384,
  volumeGlobal: null,
  rank: 1,
  dayChange: 1.18223358,
  dayChangeAmount: 20985.63093789,
  marketCap: 734615967426.4955,
  price: 38736.46401597,
  mapperName: 'BTC',
  tags: ['pow'],
  tagInfos: [
    {
      tag: 'pow',
      display: 'POW',
    },
  ],
  url: null,
  imageUrl: null,
  explorerUrls: null,
  website: null,
  tradeUrl: null,
  slug: 'bitcoin',
};

const axiosMock = new MockAdapter(axios);

beforeEach(() => {
  axiosMock.onGet('https://api.binance.com/api/v3/ticker/24hr').reply(200, []);
});

afterEach(() => {
  // axiosMock.restore();
});

test('render application if success but empty', () => {
  axiosMock
    .onGet('https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list')
    .reply(200, { data: [] });
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
  expect(screen.getByPlaceholderText('Search by symbol or name')).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();
});

test('render application if success', async () => {
  axiosMock
    .onGet('https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list')
    .reply(200, {
      data: [bitcoin],
    });
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );
  });
  setTimeout(() => {
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDefined();
  }, 5000);
});
