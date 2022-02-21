import { useQuery } from 'react-query';
import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  HStack,
  VStack,
  Container,
  Image,
  Text,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import { Column } from 'react-table';
import { Header, List } from './components';
import * as api from './services/binance.service';

export type Asset = {
  id: string;
  symbol: string; // Trade symbol
  name: string; // Actually asset code
  localFullName: string;
  tagInfos: { tag: string; display: string }[];
  marketCap: number;
  volume: number;
  price: number;
  rank: number;
};

export type Ticker = {
  symbol: string;
  priceChangePercent: string;
  lastPrice: string;
};

export const cryptoContext = createContext<{
  search: string;
  setSearch: any;
  searchTag: string;
  setSearchTag: any;
  isLoading: boolean;
  assets: Asset[];
  tags: { tag: string; display: string }[];
  prices: { [key: string]: { lastPrice: string; priceChangePercent: string; increase: boolean } };
}>({
  search: '',
  setSearch: () => null,
  searchTag: '',
  setSearchTag: () => null,
  isLoading: false,
  assets: [],
  tags: [],
  prices: {},
});

export const cryptoColumns: Column<Asset>[] = [
  {
    accessor: 'rank',
  },
  {
    accessor: 'localFullName',
  },
  {
    Header: 'Asset',
    accessor: 'name',
    Cell: (p) => {
      const {
        value,
        row: { original },
      } = p;
      return (
        <HStack>
          <Image
            src={`https://indodax.com/v2/logo/svg/color/${value.toLowerCase()}.svg`}
            fallbackSrc={`https://via.placeholder.com/32x32?text=${value.charAt(0).toUpperCase()}`}
            w="2rem"
            h="2rem"
            borderRadius="2rem"
          />
          <VStack alignItems="flex-start" pl="0.5rem">
            <Text fontWeight="bold">{value}</Text>
            <Text>{original.localFullName}</Text>
          </VStack>
        </HStack>
      );
    },
  },
  {
    Header: 'Price / 24h Change',
    accessor: 'price',
    Cell: (p) => {
      const {
        row: { original },
      } = p;
      const { prices } = useContext(cryptoContext);
      const lastPriceRate = api.round(
        parseFloat(prices[original.symbol]?.lastPrice || `${original.price}` || '0'),
        4,
      );
      const increase = prices[original.symbol]?.increase || false;
      const changePercentage = prices[original.symbol]?.priceChangePercent || '0';

      return (
        <Stat>
          <HStack>
            <StatNumber>${lastPriceRate}</StatNumber>
            <StatArrow type={increase ? 'increase' : 'decrease'} />
          </HStack>
          <StatHelpText>
            <StatArrow type={parseFloat(changePercentage) > 0 ? 'increase' : 'decrease'} />
            {changePercentage}%
          </StatHelpText>
          <StatHelpText>
            CAP: {original.marketCap > 0 ? `$${api.simplifyNumber(original.marketCap || 0)}` : '-'}
          </StatHelpText>
          <StatHelpText>
            VOL: {original.volume > 0 ? api.simplifyNumber(original.volume || 0) : '-'}
          </StatHelpText>
        </Stat>
      );
    },
  },
];

function App() {
  const [search, setSearch] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [prices, setPrices] = useState({});
  const { data: res, isLoading } = useQuery('crypto', api.getAllAssets, {
    refetchOnWindowFocus: false,
  });
  useQuery('price', api.getPrices, {
    refetchInterval: 3000,
    onSuccess: (rawPrices: Ticker[]) =>
      setPrices({ ...prices, ...api.parsePrices(rawPrices, prices) }),
  });

  const getAssets = useMemo(() => api.sanitizeAssets(res?.data || [], searchTag), [res, searchTag]);
  const getTags = useMemo(() => api.extractTags(res?.data || []), [res]);

  const contextValue = useMemo(
    () => ({
      search,
      setSearch,
      searchTag,
      setSearchTag,
      isLoading,
      assets: getAssets,
      tags: getTags,
      prices,
    }),
    [search, searchTag, isLoading, getAssets, getTags, prices],
  );

  return (
    <cryptoContext.Provider value={contextValue}>
      <Container px="0" maxWidth="45rem" borderRightWidth="1px" borderLeftWidth="1px">
        <Header />
        <List />
      </Container>
    </cryptoContext.Provider>
  );
}

export default App;
