import formatHandle from "@lib/formatHandle";
import getAvatar from "@lib/getAvatar";
import type { Profile } from "lens";
import type { FC } from "react";

interface Props {
  profile: Profile | undefined;
}

const Header: FC<Props> = ({ profile }) => {
  return (
    <div className="w-full p-4 rounded-md bg-white border border-slate-200">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="flex flex-col items-center justify-center md:flex-row md:space-x-4">
          <img
            src={getAvatar(profile)}
            alt={profile?.handle}
            className="w-24 h-24 rounded-md"
          />
          <div className="mt-2 md:block flex flex-col items-center space-y-1">
            <p className="text-slate-800 text-2xl leading-none">
              {profile?.name}
            </p>
            <span className="text-slate-500 text-sm">
              @{formatHandle(profile?.handle)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-0 md:flex md:space-x-10 mt-8 md:mt-2 w-full md:w-auto">
          <div className="md:w-auto flex flex-col space-y-1 md:items-end">
            <span className="text-sm text-slate-500">Followers</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalFollowers.toLocaleString("en-US")}
            </span>
          </div>
          <div className="md:w-auto flex flex-col space-y-1 md:items-end">
            <span className="text-sm text-slate-500">Mirrors</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalMirrors.toLocaleString("en-US")}
            </span>
          </div>
          <div className="md:w-auto flex flex-col space-y-1 md:items-end">
            <span className="text-sm text-slate-500">Collects</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalCollects.toLocaleString("en-US")}
            </span>
          </div>
          <div className="md:w-auto flex flex-col space-y-1 md:items-end">
            <span className="text-sm text-slate-500">Posts</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalPosts.toLocaleString("en-US")}
            </span>
          </div>
          <div className="md:w-auto flex flex-col space-y-1 md:items-end">
            <span className="text-sm text-slate-500">Comments</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalComments.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
