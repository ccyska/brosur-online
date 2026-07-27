"use client";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const user = localStorage.getItem("username");

    if (user) {
      setUsername(user);
    }
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold text-[#6B4E16]">
          Naratel
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="font-semibold text-[#6B4E16]">
            {username}
          </p>

          <p className="text-sm text-gray-500">
            {username}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 font-bold text-white shadow">
          {username.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}