/**
 *
 * @param string - string to convert to title case
 * @returns Title case string
 */
export const toTitleCase = (string: string) => {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
