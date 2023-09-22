"use client";

import React, { FC, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import useUploadModal from "@/hooks/useUploadModal";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children }, className) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const player = usePlayer();
  const pathname = usePathname();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const handelLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  const handleUpload = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex justify-between items-center">
        <div className=" hidden md:flex gap-x-2 items-center">
          <button className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft
              onClick={() => router.back()}
              size={35}
              className="text-white"
            />
          </button>
          <button className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight
              onClick={() => router.forward()}
              size={35}
              className="text-white"
            />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className=" rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            onClick={() => router.push("/search")}
            className=" rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch size={20} className="text-black" />
          </button>
          <button
            onClick={handleUpload}
            className=" rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition"
          >
            <BsPlus size={20} className="text-black" />
          </button>
        </div>

        {!pathname.includes("/account") && (
          <div className="flex justify-between items-center gap-x-4">
            {user ? (
              <div className="flex gap-x-4 items-center">
                <Button
                  className="bg-white px-6 py-2 hidden md:inline-flex"
                  onClick={handelLogout}
                >
                  Logout
                </Button>

                <Button
                  className="bg-white"
                  onClick={() => router.push("/account")}
                >
                  <FaUserAlt />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button onClick={onOpen} className=" bg-white px-6 py-2">
                    Log in
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
