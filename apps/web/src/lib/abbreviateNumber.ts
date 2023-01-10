export const abbreviateNumber = (value: string | number) => {
  value = Number(value);

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};
