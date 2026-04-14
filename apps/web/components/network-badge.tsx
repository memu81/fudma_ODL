"use client";

import { useEffect, useState } from "react";

function getConnectionType(): string {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
  };
  return nav.connection?.effectiveType ?? "unknown";
}

export function NetworkBadge() {
  const [connectionType, setConnectionType] = useState("checking");

  useEffect(() => {
    setConnectionType(getConnectionType());
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "#7c2d12",
        background: "#ffedd5",
        borderRadius: "9999px",
        padding: "0.15rem 0.6rem"
      }}
    >
      Network: {connectionType}
    </span>
  );
}
