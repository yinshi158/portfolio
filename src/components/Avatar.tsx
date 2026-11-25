"use client";

import { useState } from "react";

export default function Avatar({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="portrait-avatar"
      onError={() => setFailed(true)}
    />
  );
}
