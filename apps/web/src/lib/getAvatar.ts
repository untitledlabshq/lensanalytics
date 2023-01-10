import getIPFSLink from "./getIPFSLink";

/**
 *
 * @param profile - Profile object
 * @returns avatar image url
 */
const getAvatar = (profile: any): string => {
  if (!profile?.picture) {
    return "";
  }
  return getIPFSLink(profile?.picture?.original?.url ?? profile?.picture?.uri);
};

export default getAvatar;
