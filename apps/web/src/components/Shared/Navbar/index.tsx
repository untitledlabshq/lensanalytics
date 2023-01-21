import GithubLogo from "@assets/github.svg";
import Image from "next/image";
import Link from "next/link";
import { GIT_REPO } from "src/constants";

import Search from "./Search";

const Navbar = () => {
  return (
    <div className="w-full border-b border-slate-100 py-4 px-4 bg-white">
      <div className="w-full md:max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-end space-x-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-5 h-5"
              width={24}
              height={24}
            />
            <h1 className="text-lg text-slate-900 font-semibold leading-none hidden md:block">
              Lens Analytics
            </h1>
          </div>
        </Link>
        <div className="w-full max-w-[60%] md:max-w-[30%] ml-4">
          <div className="w-full flex items-center space-x-4">
            {/* Search Bar */}
            <Search />
            <Link href={GIT_REPO} target="_blank" rel="noreferrer">
              <Image
                src={GithubLogo}
                width={24}
                height={24}
                alt="github_logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
