// "use client"

// import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  // const [state, setState] = useState(0);
  return (
    <div>
      {/* <h1>Template: {state}</h1>
      <button className="px-6 py-2 bg-amber-800 text-white rounded-sm" onClick={() => { setState(state + 1)}}>Klik</button> */}
      {children}
    </div>
  );
}
