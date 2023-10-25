"use client";
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [dateState, setDateState] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="flex items-center justify-center py-4">
      <div className="text-white opacity-70 text-7xl font-semibold tracking-tight">
        {dateState &&
          dateState.toLocaleString("pl-PL", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
      </div>
    </div>
  );
};

export default Clock;
