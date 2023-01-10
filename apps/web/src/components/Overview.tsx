import { Spinner } from "@components/UI/Spinner";
import { abbreviateNumber } from "@lib/abbreviateNumber";
import type { LensStatsQuery } from "lens";
import { useLensStatsQuery } from "lens";

const stats: Array<{
  label: string;
  key: keyof LensStatsQuery["globalProtocolStats"];
}> = [
  {
    label: "Total Minted Profiles",
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
                <p
                  className="text-3xl font-light text-slate-800"
                  title={Number(
                    data?.globalProtocolStats?.[el.key] ?? 0
                  ).toLocaleString("en-US")}
                >
                  {abbreviateNumber(data?.globalProtocolStats?.[el.key] ?? 0)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
