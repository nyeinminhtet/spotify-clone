"use client";

import React from "react";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "@/components/Button";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AccountContent = () => {
  const { user: fromContext } = useUser();
  const user = fromContext?.user_metadata;
  const supabaseClient = useSupabaseClient();
  const player = usePlayer();
  const router = useRouter();

  const handelLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.push("/");

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col mx-auto w-[80vw] sm:max-w-[50vw] md:max-w-[50vw] lg:max-w-[30vw]">
      <div className="bg-neutral-800 rounded-lg px-5 w-full flex justify-center items-center">
        <div className=" w-full mt-10">
          <div className=" relative flex justify-evenly items-center">
            <div className=" relative h-10 w-10  md:h-20 md:w-20">
              <Image
                src={user.picture}
                alt="profile picture"
                fill
                className=" object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className=" text-xl sm:text-2xl font-semibold">{user?.name}</p>
              <p className=" text-neutral-200 text-sm">{user?.email}</p>
            </div>
          </div>

          <Button className=" my-20" onClick={handelLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
