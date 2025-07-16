'use client'
import { useEffect } from "react";
import { addRackPhysics } from "../lib/physics";
export default function RackSlot({ x = 0, y = 0, width = 120, height = 40 }) {
    useEffect(() => {
        addRackPhysics(x,y,width,height);
      }, [x,y,width,height]);
  return (
    <div
      className="rack-slot absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: "none",

        // Outer rounded shape
        border: "6px solid #666",
        borderRadius: `${width / 2}px / ${height}px`,
        boxSizing: "border-box",

        // Shadow now visible properly
        boxShadow: `
          20px 20px 20px rgba(0,0,0,1),    /* outer soft shadow */
          inset 0 10px 20px rgba(0,0,0,1) /* inner shadow for depth */
        `,

        background: "transparent",
        opacity: 0.9,

        // Trick: mask top side of the border so only lower “bowl” is visible
        maskImage: "linear-gradient(to bottom, transparent 0%, transparent 70%, black 71%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 70%, black 71%)",
      }}
    />
  );
}