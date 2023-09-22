"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
      position="top-center"
    />
  );
};

export default ToasterProvider;
