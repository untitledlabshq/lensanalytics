import type { Placement } from "@popperjs/core";
import Tippy from "@tippyjs/react/headless";
import type { FC, ReactElement } from "react";

interface Props {
  content: string | ReactElement;
  children: ReactElement;
  placement?: Placement;
  offsetX?: number;
  offsetY?: number;
}

const Popover: FC<Props> = ({
  content,
  children,
  placement = "auto",
  offsetX = 8,
  offsetY = 8,
}) => {
  return (
    <Tippy
      render={(attrs) => (
        <div
          className="bg-white p-2 rounded border border-slate-200"
          {...attrs}
        >
          {content}
        </div>
      )}
      placement={placement}
      offset={[offsetX, offsetY]}
    >
      {children}
    </Tippy>
  );
};

export default Popover;
