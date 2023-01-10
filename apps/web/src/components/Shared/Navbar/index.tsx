import Search from "./Search";

const Navbar = () => {
  return (
    <div className="w-full border-b border-slate-100 py-4 px-4 bg-white">
      <div className="w-full md:max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-end space-x-2">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-5 h-5"
            width={24}
            height={24}
          />
          <h1 className="text-lg text-slate-900 font-semibold leading-none">
            Lens Analytics
          </h1>
        </div>
        {/* Search Bar */}
        <div className="flex-1 w-full md:max-w-[30%]">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
