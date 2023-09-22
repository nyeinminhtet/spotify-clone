"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValed = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debounceValed,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debounceValed, router]);

  return (
    <Input
      placeholder="What do you want to listen?"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export default SearchInput;
