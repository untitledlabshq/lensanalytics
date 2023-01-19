import getIPFSLink from "./getIPFSLink";

/**
 *
 * @param publication - Publication object
 * @returns publication image url
 */
const getPublicationThumbnail = (publication: any): string => {
  if (!publication?.metadata?.media) {
    return "";
  }
  return getIPFSLink(publication?.metadata?.media[0]?.original?.url ?? "");
};

export default getPublicationThumbnail;
