"use client";

import { useEffect, useRef } from "react";

export default function SeedInitializer() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    fetch("/api/seed", { method: "POST" }).catch(() => {
      // Ignore seed errors — data may already exist
    });
  }, []);

  return null;
}
