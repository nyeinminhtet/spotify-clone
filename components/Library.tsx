"use client";

import React, { FC } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";

import MediaItem from "./MediaItem";

interface Props {
  songs: Song[];
}

const Library: FC<Props> = ({ songs }) => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const onPlay = useOnPlay(songs);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className=" flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className=" inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className=" text-neutral-400" />
          <p className=" text-neutral-400 text-md font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className=" text-neutral-400 hover:text-white cursor-pointer transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={(id: string) => onPlay(id)}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
