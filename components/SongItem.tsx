"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React, { FC } from "react";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      className=" 
      relative group flex flex-col justify-center items-center rounded-md overflow-hidden gap-x-4
    bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      onClick={() => onClick(data.id)}
    >
      <div className=" relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className=" object-cover"
          src={imagePath || "/liked.png"}
          alt="song image"
          fill
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className=" font-semibold truncate w-full capitalize">
          {data.title}
        </p>
        <p className=" text-neutral-400 text-sm pb-4 w-full truncate capitalize">
          {data.author}
        </p>
      </div>

      <div className=" absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
