import { LENSPROTOCOL_HANDLE } from "src/constants";

/**
 *
 * @param handle - Complete handle
 * @param keepSuffix - Keep .lens or .test suffix
 * @returns formatted handle without .lens or .test suffix
 */
const formatHandle = (handle: string | null, keepSuffix = false): string => {
  if (!handle) {
    return "";
  }

  if (handle?.toLowerCase() === LENSPROTOCOL_HANDLE) {
    return handle;
  }

  if (keepSuffix) {
    return handle.match(".lens")
      ? handle.split(".lens")[0] + ".lens"
      : handle + ".lens";
  }

  return handle.replace(".lens", "");
};

export default formatHandle;
