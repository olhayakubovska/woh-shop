"use client";

import { useEffect, useState } from "react";

export function useSkeletonCount(): number {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1920) setCount(18);
      else if (w >= 640) setCount(6);
      else setCount(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}
