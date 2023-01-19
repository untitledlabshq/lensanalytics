import formatHandle from "@lib/formatHandle";
import getAvatar from "@lib/getAvatar";
import type { Profile } from "lens";
import type { FC } from "react";

interface Props {
  profile: Profile | undefined;
}

const Header: FC<Props> = ({ profile }) => {
  return (
    <div className="p-4 rounded-md bg-white border border-slate-200">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <img
            src={getAvatar(profile)}
            alt={profile?.handle}
            className="w-24 h-24 rounded-md"
          />
          <div className="mt-2">
            <p className="text-slate-800 text-2xl leading-none">
              {profile?.name}
            </p>
            <span className="text-slate-500 text-sm">
              @{formatHandle(profile?.handle)}
            </span>
          </div>
        </div>
        <div className="flex space-x-10 mt-2">
          <div className="flex flex-col space-y-1 items-end">
            <span className="text-sm text-slate-500">Followers</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalFollowers.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <span className="text-sm text-slate-500">Posts</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalPosts.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <span className="text-sm text-slate-500">Mirrors</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalMirrors.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <span className="text-sm text-slate-500">Comments</span>
            <span className="text-3xl font-light text-slate-800">
              {profile?.stats.totalComments.toLocaleString("en-US")}
            </span>
          </div>
          {/* <div className="flex flex-col space-y-1 items-end">
            <span className="text-sm text-slate-500">Revenue</span>
            <span className="text-3xl font-light text-slate-800">
              ${Number(0).toLocaleString("en-US")}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
