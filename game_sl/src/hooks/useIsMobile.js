"use client";

import { useEffect, useState } from "react";

export default function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(Boolean(mq.matches));
    update();

    // Safari/旧浏览器兼容：addEventListener 失败则回退到 addListener
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, [breakpointPx]);

  return isMobile;
}

