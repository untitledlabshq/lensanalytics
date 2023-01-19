import getPublicationRevenue from "@lib/getPublicationRevenue";
import getPublicationThumbnail from "@lib/getPublicationThumbnail";
import getTokenLogo from "@lib/getTokenLogo";
import { toTitleCase } from "@lib/toTitleCase";
import { createColumnHelper } from "@tanstack/react-table";
import type { Post } from "lens";
import { PublicationTypes, useProfilePublicationsQuery } from "lens";
import Link from "next/link";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { postState } from "src/store/posts";

import Shimmer from "../UI/Shimmer";
import Table from "../UI/Table";

interface Props {
  className?: string;
  profileId: string;
}

const PostsTable: FC<Props> = ({ className, profileId }) => {
  // states
  const offset = postState((state) => state.offset);
  const currentPageInfo = postState((state) => state.currentPageInfo);

  const setOffset = postState((state) => state.setOffset);
  const setCurrentPageInfo = postState((state) => state.setCurrentPageInfo);

  const { data, loading } = useProfilePublicationsQuery({
    variables: {
      request: {
        profileId,
        publicationTypes: [PublicationTypes.Post],
        limit: 10,
        cursor: offset,
      },
    },
  });

  const publications = data?.publications.items ?? Array(10).map(() => ({}));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((currentPageInfo?.totalCount ?? 0) / 10);

  useEffect(() => {
    if (!data?.publications.pageInfo) {
      return;
    }
    setCurrentPageInfo(data?.publications.pageInfo);
  }, [data?.publications.pageInfo, setCurrentPageInfo]);

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
  const columnHelper = createColumnHelper<Post>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        cell: (info) => (
          <div className="max-w-[400px]">
            {loading ? (
              <Shimmer>
                <div className="flex space-x-3">
                  <div className="w-[96px] h-[48px] bg-slate-200 rounded-sm" />
                  <div className="flex flex-col space-y-1">
                    <div className="h-2 bg-slate-200 rounded w-24" />
                    <div className="h-1 bg-slate-200 rounded w-16" />
                  </div>
                </div>
              </Shimmer>
            ) : (
              <Link
                href={`https://lenster.xyz/posts/${info.getValue().id}`}
                target={"_blank"}
              >
                <div className="flex space-x-3">
                  {info.getValue() && info.getValue()?.metadata?.media[0] ? (
                    <img
                      src={getPublicationThumbnail(info.getValue())}
                      alt={info.getValue().id}
                      className="min-w-[96px] max-w-[96px] min-h-[48px] max-h-[48px] rounded-sm object-cover"
                    />
                  ) : (
                    <div className="bg-slate-100 border border-slate-200 min-w-[96px] min-h-[48px] max-h-[48px] rounded-sm" />
                  )}
                  <div className="flex flex-col">
                    <p className="line-clamp-1 font-light text-sm">
                      {info.getValue()?.metadata?.content}
                    </p>
                    <span className="text-slate-500 text-xs">
                      {info.getValue()?.metadata?.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ),
        footer: (info) => info.column.id,
        header: "Post",
      }),
      columnHelper.accessor((row) => row.appId, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{toTitleCase(info.getValue() ?? "-")}</span>
          ),
        footer: (info) => info.column.id,
        header: "Posted From",
      }),
      columnHelper.accessor((row) => row.stats.totalAmountOfComments, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{info.getValue()}</span>
          ),
        footer: (info) => info.column.id,
        header: "Comments",
      }),
      columnHelper.accessor((row) => row.stats.totalAmountOfMirrors, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{info.getValue()}</span>
          ),
        footer: (info) => info.column.id,
        header: "Mirrors",
      }),
      columnHelper.accessor((row) => row.stats.totalAmountOfCollects, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <span>{info.getValue()}</span>
          ),
        footer: (info) => info.column.id,
        header: "Collects",
      }),
      columnHelper.accessor((row) => row, {
        cell: (info) =>
          loading ? (
            <Shimmer>
              <div className="h-2 bg-slate-200 rounded w-16" />
            </Shimmer>
          ) : (
            <div className="flex items-center space-x-2 text-right">
              {getPublicationRevenue(info.getValue()).asset && (
                <img
                  src={getTokenLogo(
                    getPublicationRevenue(info.getValue()).asset.symbol
                  )}
                  alt={getPublicationRevenue(info.getValue()).asset.symbol}
                  className="w-4 h-4 rounded-full"
                />
              )}
              <span>
                {getPublicationRevenue(info.getValue()).value.toLocaleString(
                  "en-US"
                )}
              </span>
            </div>
          ),
        footer: (info) => info.column.id,
        header: "Revenue",
      }),
    ],
    [columnHelper, loading]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mt-8 mb-4">
        <p className="text-xl font-semibold text-slate-800" />
      </div>
      {publications && <Table columns={columns} data={publications} />}
      {/* Pagination */}
      {
        <div className="w-full flex items-center justify-between md:justify-end md:space-x-4 mt-4">
          {
            <button
              className="py-2 px-4 border border-slate-200 text-slate-800 text-sm rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => prevPage()}
            >
              Previous
            </button>
          }
          {
            <button
              className="py-2 px-4 border border-slate-200 text-slate-800 text-sm rounded-md bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => nextPage()}
            >
              Next
            </button>
          }
        </div>
      }
    </div>
  );
};

export default PostsTable;
