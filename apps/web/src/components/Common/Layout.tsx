import Loading from "@components/Shared/Loading";
import Navbar from "@components/Shared/Navbar";
import useIsMounted from "hooks/useIsMounted";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { mounted } = useIsMounted();

  if (!mounted) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen md:pb-0 pb-14 bg-slate-50/50">
      <Navbar />
      <div className="w-full md:max-w-6xl mx-auto p-4 md:px-0">{children}</div>
    </div>
  );
};

export default Layout;
