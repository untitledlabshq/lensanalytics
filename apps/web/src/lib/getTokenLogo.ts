/**
 *
 * @param symbol - symbol string
 * @returns token logo image url
 */

const wrappedTokensMap = new Map([["wmatic", "matic"]]);

const getSymbol = (symbol: string) => {
  const isWrappedToken = wrappedTokensMap.get(symbol.toLocaleLowerCase());
  return isWrappedToken
    ? wrappedTokensMap.get(symbol.toLocaleLowerCase())
    : symbol.toLocaleLowerCase();
};

const getTokenLogo = (symbol: string) => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${getSymbol(
    symbol
  )}.svg`;
};

export default getTokenLogo;
