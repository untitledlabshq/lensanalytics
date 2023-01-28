import { MicrophoneIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import getPublicationThumbnail from "@lib/getPublicationThumbnail";
import type { Publication } from "lens";
import type { FC } from "react";

interface Props {
  publication: Publication;
}

const Thumbnail: FC<Props> = ({ publication }) => {
  const urlOrType = getPublicationThumbnail(publication);
  switch (urlOrType.type) {
    case "audio":
      return (
        <div className="bg-slate-100 border border-slate-200 min-w-[96px] min-h-[48px] max-h-[48px] rounded-sm">
          <div className="min-w-[96px] max-w-[96px] min-h-[48px] max-h-[48px] flex justify-center items-center">
            <MicrophoneIcon
              className="text-slate-400"
              height={"40px"}
              width={"40px"}
            />
          </div>
        </div>
      );
    case "video":
      return (
        <img
          src={urlOrType.url}
          alt={publication.id}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/video-fallback.png";
          }}
          className="min-w-[96px] max-w-[96px] min-h-[48px] max-h-[48px] rounded-sm object-cover"
        />
      );
    case "image":
      return (
        <img
          src={urlOrType.url}
          alt={publication.id}
          className="min-w-[96px] max-w-[96px] min-h-[48px] max-h-[48px] rounded-sm object-cover"
        />
      );
    default:
      return (
        <div className="bg-slate-100 border border-slate-200 min-w-[96px] min-h-[48px] max-h-[48px] rounded-sm">
          <div className="min-w-[96px] max-w-[96px] min-h-[48px] max-h-[48px] flex justify-center items-center">
            <PencilSquareIcon
              className="text-slate-400"
              height={"40px"}
              width={"40px"}
            />
          </div>
        </div>
      );
  }
};

export default Thumbnail;
