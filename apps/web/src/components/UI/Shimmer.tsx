import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Shimmer: FC<Props> = ({ children }) => {
  return <div className="animate-pulse">{children}</div>;
};

export default Shimmer;
