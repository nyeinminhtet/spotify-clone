import Header from "@/components/Header";
import React from "react";
import AccountContent from "./AccountContent";

const Account = () => {
  return (
    <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className=" from-neutral-400">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className=" font-semibold text-3xl text-white">
            Account Setting
          </h1>
        </div>
      </Header>

      <AccountContent />
    </div>
  );
};

export default Account;
