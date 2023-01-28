import type { Publication } from "lens";

import getIPFSLink from "./getIPFSLink";

const getThumbnailUrl = (publication: Publication): string => {
  const url =
    publication.metadata?.cover?.original.url || publication.metadata?.image;
  return url;
};

/**
 *
 * @param publication - Publication object
 * @returns publication image url
 */
const getPublicationThumbnail = (
  publication: Publication
): {
  url: string;
  type: "non-media" | "audio" | "video" | "image";
} => {
  if (publication?.metadata?.media[0]?.original?.mimeType.startsWith("video")) {
    return {
      type: "video",
      url: getIPFSLink(getThumbnailUrl(publication)),
    };
  }
  if (publication?.metadata?.media[0]?.original?.mimeType.startsWith("audio")) {
    return {
      type: "audio",
      url: getIPFSLink(getThumbnailUrl(publication)),
    };
  }
  if (publication?.metadata?.media[0]?.original?.mimeType.startsWith("image")) {
    return {
      type: "image",
      url: getIPFSLink(getThumbnailUrl(publication)),
    };
  }
  return {
    type: "non-media",
    url: getIPFSLink(publication?.metadata?.media[0]?.original?.url ?? ""),
  };
};

export default getPublicationThumbnail;
