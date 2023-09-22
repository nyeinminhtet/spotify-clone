import { UserDetails } from "@/types";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDeatils = () => supabase.from("users").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDeatils()]).then((results) => {
        const userDetailPromise = results[0];

        if (userDetailPromise.status === "fulfilled") {
          setUserDetails(userDetailPromise.value.data as UserDetails);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("userUser must be used within  a UserContextProvider");
  }

  return context;
};
