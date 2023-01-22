import { Spinner } from "@components/UI/Spinner";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { abbreviateNumber } from "@lib/abbreviateNumber";
import type { LensStatsQuery } from "lens";
import { useLensStatsQuery } from "lens";

import Popover from "./UI/Popover";

const stats: Array<{
  label: string;
  key: keyof LensStatsQuery["globalProtocolStats"];
}> = [
  {
    label: "Total Profiles Minted",
    key: "totalProfiles",
  },
  {
    label: "Total Posts",
    key: "totalPosts",
  },
  {
    label: "Total Comments",
    key: "totalComments",
  },
  {
    label: "Total Mirrors",
    key: "totalMirrors",
  },
  {
    label: "Total Collects",
    key: "totalCollects",
  },
];

const Overview = () => {
  const { data, loading } = useLensStatsQuery({ variables: { request: null } });
  const { data: lastPeriodData } = useLensStatsQuery({
    variables: {
      request: { fromTimestamp: Math.ceil(Date.now() / 1000) - 30 * 86400 }, // data from last 30 days
    },
  });

  return (
    <div className="p-6 border border-slate-200/75 rounded-md w-full bg-white">
      <div
        className={`flex flex-wrap items-center justify-between gap-y-8 md:gap-0`}
      >
        {stats.map((el, idx) => {
          return (
            <div key={idx} className="flex flex-col space-y-2 w-1/2 md:w-auto">
              <p className="text-slate-500/75 text-sm">{el.label}</p>
              {loading ? (
                <Spinner size="xs" />
              ) : (
                <div className="flex space-x-2 items-end">
                  <p className="text-3xl font-light text-slate-800">
                    {abbreviateNumber(
                      data?.globalProtocolStats?.[el.key] ?? 0,
                      1
                    )}
                  </p>
                  {lastPeriodData?.globalProtocolStats && (
                    <Popover
                      content={
                        <span className="lowercase text-xs text-slate-600">{`${el.label.replace(
                          "Total",
                          (
                            lastPeriodData?.globalProtocolStats?.[el.key] ?? 0
                          ).toLocaleString("en-US")
                        )} since last 30 days`}</span>
                      }
                    >
                      <div className="hidden md:flex items-end space-x-1 text-green-600 text-sm mb-1 border-b border-green-600 border-dashed cursor-pointer">
                        <span>
                          {abbreviateNumber(
                            lastPeriodData?.globalProtocolStats?.[el.key] ?? 0
                          )}
                        </span>
                        {lastPeriodData?.globalProtocolStats && (
                          <ArrowUpIcon className="w-3 h-3 mb-[3px]" />
                        )}
                      </div>
                    </Popover>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
