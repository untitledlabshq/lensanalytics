import { Menu, Transition } from "@headlessui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import getAvatar from "@lib/getAvatar";
import { toTitleCase } from "@lib/toTitleCase";
import { createColumnHelper } from "@tanstack/react-table";
import type { Profile } from "lens";
import { ProfileSortCriteria, useExploreProfilesQuery } from "lens";
import type { FC } from "react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { leaderboardState } from "src/store/leaderboard";

import Shimmer from "./UI/Shimmer";
import Table from "./UI/Table";

interface Props {
  className?: string;
}

const Leaderboard: FC<Props> = ({ className }) => {
  // states
  const sortBy = leaderboardState((state) => state.sortBy);
  const offset = leaderboardState((state) => state.offset);
  const currentPageInfo = leaderboardState((state) => state.currentPageInfo);
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState<string | undefined>();

  const setSortBy = leaderboardState((state) => state.setSortBy);
  const setOffset = leaderboardState((state) => state.setOffset);
  const setCurrentPageInfo = leaderboardState(
    (state) => state.setCurrentPageInfo
  );

  const { data, loading } = useExploreProfilesQuery({
    variables: { request: { sortCriteria: sortBy, limit: 10, cursor: offset } },
  });

  //   const { data: searchedProfiles, loading: searchLoading } =
  //     useSearchProfilesQuery({
  //       variables: {
  //         request: {
  //           query: searchText,
  //           limit: 10,
  //           type: SearchRequestTypes.Profile,
  //         },
  //       },
  //     });

  const profiles = data?.exploreProfiles.items ?? Array(10).map(() => ({}));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((currentPageInfo?.totalCount ?? 0) / 10);

  useEffect(() => {
    if (!data?.exploreProfiles.pageInfo) {
      return;
    }
    setCurrentPageInfo(data?.exploreProfiles.pageInfo);
  }, [data?.exploreProfiles.pageInfo, setCurrentPageInfo]);

  useEffect(() => {
    setCurrentPage(
      currentPageInfo?.next &&
        Number(JSON.parse(currentPageInfo.next).offset) / 10
    );
  }, [currentPageInfo?.next]);

  const prevPage = () => {
    setOffset(currentPageInfo?.prev);
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setOffset(currentPageInfo?.next);
    setCurrentPage(currentPage + 1);
  };

  // Table columns
  const columnHelper = createColumnHelper<Profile>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => ``, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{Number(info.row.index + 1 + (currentPage - 1) * 10)}</span>
          ),
        footer: (info) => info.column.id,
        header: "Rank",
      }),
      columnHelper.accessor((row) => row, {
        cell: (info) => (
          <div>
            {loading ? (
              <Shimmer>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />
                  <div className="flex flex-col space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-24" />
                    <div className="h-1 bg-slate-200 rounded w-16" />
                  </div>
                </div>
              </Shimmer>
            ) : (
              <div className="flex items-center space-x-3">
                {info.getValue() && info.getValue().picture ? (
                  <img
                    src={getAvatar(info.getValue())}
                    alt={info.getValue().handle}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />
                )}
                <div className="flex flex-col">
                  <span>
                    {info.getValue().name ?? `@${info.getValue().handle}`}
                  </span>
                  {info.getValue().name && (
                    <span className="text-slate-500 text-xs">
                      @{info.getValue().handle}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ),
        footer: (info) => info.column.id,
        header: "Name",
      }),
      columnHelper.accessor((row) => `${row.stats.totalFollowers}`, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{Number(info.getValue()).toLocaleString("en-US")}</span>
          ),
        footer: (info) => info.column.id,
        header: "Followers",
      }),
      columnHelper.accessor((row) => `${row.stats.totalPosts}`, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{Number(info.getValue()).toLocaleString("en-US")}</span>
          ),
        footer: (info) => info.column.id,
        header: "Published Posts",
      }),
      columnHelper.accessor((row) => `${row.stats.totalMirrors}`, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{Number(info.getValue()).toLocaleString("en-US")}</span>
          ),
        footer: (info) => info.column.id,
        header: "Mirrors",
      }),
    ],
    [columnHelper, currentPage, loading]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-xl font-semibold text-slate-800">Leaderboard</p>
        <div className="flex items-center space-x-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex items-center space-x-2 py-2 px-4 border border-slate-200 text-slate-800 text-sm rounded-md bg-white disabled:bg-slate-100">
                <ArrowsUpDownIcon
                  className="h-4 w-4 text-slate-800"
                  aria-hidden="true"
                />
                <span>{toTitleCase(sortBy.replace("_", " "))}</span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {Object.values(ProfileSortCriteria).map((option, idx) => {
                    return (
                      <Menu.Item key={idx}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-900 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => {
                              setSortBy(option);
                              setCurrentPage(1);
                              // eslint-disable-next-line unicorn/no-useless-undefined
                              setOffset(null);
                            }}
                          >
                            {toTitleCase(option.replace("_", " "))}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <Table columns={columns} data={profiles} />
      {/* Pagination */}
      {
        <div className="w-full flex items-center justify-between md:justify-end md:space-x-4 mt-4">
          {currentPage > 1 && (
            <button
              className="py-2 px-4 border border-slate-200 text-slate-800 text-sm rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => prevPage()}
            >
              Previous
            </button>
          )}
          <span className="text-sm text-slate-600">
            Page{" "}
            <span className="font-medium text-slate-800">{currentPage}</span> of{" "}
            <span className="font-medium text-slate-800">
              {totalPages.toLocaleString("en-US")}
            </span>
          </span>
          {currentPage < totalPages && (
            <button
              className="py-2 px-4 border border-slate-200 text-slate-800 text-sm rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => nextPage()}
            >
              Next
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default Leaderboard;
