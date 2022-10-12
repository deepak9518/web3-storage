import { COLORS } from "../../constants/colors";
import React from "react";
export const LoaderIcon = ({
  color = COLORS.WHITE_100,
}: {
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "transparent",
      }}
      width={80}
      height={80}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
    >
      <circle
        cx={50}
        cy={50}
        r={32}
        strokeWidth={8}
        stroke={color}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        />
      </circle>
    </svg>
  );
};
