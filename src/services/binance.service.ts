import axios from 'axios';
import { Asset, Ticker } from '../App';

export const getAllAssets = () =>
  axios
    .get('https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list')
    .then((res) => res.data);

export const getPrices = () =>
  axios.get('https://api.binance.com/api/v3/ticker/24hr').then((res) => res.data);

export const round = (number: number, decimals: number) => {
  const x = 10 ** (Number(decimals) + 1);
  return (Number(number) + 1 / x).toFixed(decimals);
};

export const simplifyNumber = (number: number) => {
  const abbrev = ['', 'K', 'M', 'B', 'T'];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return (number / 10 ** (order * 3)).toFixed(2) + suffix;
};

export const sanitizeAssets = (assets: Asset[], tag: string) => {
  const sanitizedAssets = assets.map((asset) => {
    const sanitizedAsset = asset;
    sanitizedAsset.rank = asset.rank || assets.length;
    return sanitizedAsset;
  });
  if (!tag) {
    return sanitizedAssets;
  }
  return sanitizedAssets.filter((asset) =>
    (asset.tagInfos || []).map((info) => info.tag).includes(tag),
  );
};

export const extractTags = (assets: Asset[]) => {
  const tags = new Map<string, string>();
  assets.forEach((asset) => {
    (asset.tagInfos || []).forEach((info) => tags.set(info.tag, info.display));
  });
  return Array.from(tags, (item) => {
    return { tag: item[0], display: item[1] };
  });
};

export const parsePrices = (
  prices: Ticker[],
  currPrices: {
    [key: string]: { lastPrice: string; priceChangePercent: string; increase: boolean };
  },
) => {
  const parsedPrices: {
    [key: string]: { lastPrice: string; priceChangePercent: string; increase: boolean };
  } = {};
  prices.forEach((price) => {
    parsedPrices[price.symbol] = {
      lastPrice: price.lastPrice,
      priceChangePercent: price.priceChangePercent,
      increase:
        parseFloat(price.lastPrice) > parseFloat(currPrices[price.symbol]?.lastPrice || '0'),
    };
  });
  return parsedPrices;
};
