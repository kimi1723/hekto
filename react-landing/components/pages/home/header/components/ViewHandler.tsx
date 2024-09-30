import { FC } from "react";

import { type HomeHeaderView as View } from "@/helpers/constants/pages";

interface ViewHandlerProps {
  views: View[];
  activeView: View;
  onClick: (view: View) => void;
}

const ViewHandler: FC<ViewHandlerProps> = ({ views, activeView, onClick }) => {
  return (
    <menu className="absolute bottom-[44px] left-1/2 flex gap-4">
      {views.map((view) => (
        <li key={view}>
          <button
            className={`aspect-square h-3 hocus:scale-125 focus:outline-none transition-all rotate-45 border border-solid border-primary ${
              activeView === view ? "bg-primary" : ""
            }`}
            onClick={() => onClick(view)}
          ></button>
        </li>
      ))}
    </menu>
  );
};

export default ViewHandler;
