"use client";

import { useEffect, useState } from "react";

// Read the year after mount (with a hydration-suppressed first paint) so a
// statically prerendered footer never bakes in a stale build-time year.
export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span suppressHydrationWarning>{year}</span>;
}
