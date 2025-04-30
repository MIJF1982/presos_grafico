export const TD_WEBSOCKET_URL = symbol =>
  `wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.REACT_APP_TWELVE_DATA_API_KEY}&symbol=${symbol}`;
