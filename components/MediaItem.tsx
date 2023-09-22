"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: FC<Props> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleOnClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className=" relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageUrl || "/liked.png"}
          alt="song image"
          className=" object-cover"
          fill
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className=" text-white truncate">{data.title}</p>
        <p className=" text-xs text-neutral-400 truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
