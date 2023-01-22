export const abbreviateNumber = (
  value: string | number,
  decimals: number = 2
) => {
  value = Number(value);

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: decimals,
  }).format(value);
};
