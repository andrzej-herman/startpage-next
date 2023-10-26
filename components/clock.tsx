"use client";
import React, { useState, useEffect } from "react";
import Spinner from "./spinner";

const Clock = () => {
  const [dateState, setDateState] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="flex items-center justify-center py-2 min-h-[70px]">
      {dateState !== undefined ? (
        <div className="text-white opacity-60 text-5xl font-semibold tracking-tight">
          {dateState &&
            dateState.toLocaleString("pl-PL", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Clock;
