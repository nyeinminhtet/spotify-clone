"use client";

import Image from "next/image";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={handleClick}
      className=" relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10
    hover:bg-neutral-100/20 pr-4 transition"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt="Liked-Image" className=" object-cover" fill />
      </div>
      <p className=" truncate font-medium py-5">{name}</p>
      <div
        className=" absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500
      p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
