import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";

const Search = () => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState<string | undefined>();

  return (
    <div>
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
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
};

export default Search;
