"use client";

import { refreshAccessTokenAction } from "../_lib/actions/actions";

function Testt({ accessToken }) {
  return (
    <button
      onClick={() => refreshAccessTokenAction(accessToken)}
      className="cursor-pointer inline px-2 py-4 bg-amber-500 hover:bg-amber-800 transition-all"
    >
      here is sex
    </button>
  );
}

export default Testt;
