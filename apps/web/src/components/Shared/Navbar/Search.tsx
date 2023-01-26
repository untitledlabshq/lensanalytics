import { Spinner } from "@components/UI/Spinner";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import formatHandle from "@lib/formatHandle";
import getAvatar from "@lib/getAvatar";
import clsx from "clsx";
import {
  SearchRequestTypes,
  useProfilesQuery,
  useSearchProfilesQuery,
} from "lens";
import Link from "next/link";
import { useMemo, useState } from "react";
import Web3 from "web3";

const Search = () => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const web3 = new Web3();

  const { data, loading } = useSearchProfilesQuery({
    variables: {
      request: {
        query: searchText,
        type: SearchRequestTypes.Profile,
        limit: 10,
      },
    },
  });

  const profileData = useProfilesQuery({
    variables: {
      request: { ownedBy: [searchText] },
    },
  });

  const items = useMemo(
    () =>
      web3.utils.isAddress(searchText)
        ? profileData.data?.profiles.items
          ? profileData.data?.profiles.items
          : []
        : data?.search.__typename === "ProfileSearchResult"
        ? data.search.items
        : [],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [(data?.search.__typename, (data?.search as any)?.items)]
  );

  return (
    <div className="w-full relative">
      <div
        className={clsx(
          "flex items-center space-x-2 border rounded-md p-2",
          `${focused ? "border-slate-600" : "border-slate-200"}`
        )}
      >
        <MagnifyingGlassIcon
          className={clsx(
            "w-5 h-5",
            `${focused ? "text-slate-900" : "text-slate-400"}`
          )}
        />
        <input
          type="text"
          placeholder="Search by Handle / Wallet Address"
          className={`text-sm w-full appearance-none focus:outline-none text-slate-900`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {!!searchText?.length && (
        <div className="w-full absolute mt-2 right-0 bg-white p-2 rounded-md border border-slate-200 z-10 max-h-[512px] shadow-sm overflow-y-auto">
          {loading && (
            <div className="flex items-center space-x-2 py-2">
              <Spinner size="xs" />
              <p className="text-sm text-slate-500">Searching...</p>
            </div>
          )}
          {!loading &&
            items.map((profile) => {
              return (
                <Link
                  key={profile.id}
                  href={`/u/${formatHandle(profile.handle)}`}
                  // eslint-disable-next-line unicorn/no-useless-undefined
                  onClick={() => setSearchText("")}
                >
                  <div className="flex items-center space-x-3 hover:cursor-pointer hover:bg-slate-100 rounded p-2 transition-all">
                    {profile && profile.picture ? (
                      <img
                        src={getAvatar(profile)}
                        alt={profile.handle}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />
                    )}
                    <div className="flex flex-col">
                      <span>{profile.name ?? `@${profile.handle}`}</span>
                      {profile.name && (
                        <span className="text-slate-500 text-xs">
                          @{profile.handle}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          {!loading && items?.length === 0 && (
            <p className="text-sm text-slate-500 py-2">No user found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
