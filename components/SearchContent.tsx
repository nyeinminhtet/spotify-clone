"use client";

import React, { FC } from "react";

import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

interface Props {
  songs: Song[];
}

const SearchContent: FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 px-6 w-full">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>

          {/* like button */}
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
