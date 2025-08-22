import React from "react";

interface RunningIconProps {
  size?: number;
  className?: string;
}

const RunningIcon: React.FC<RunningIconProps> = ({
  size = 24,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Running person silhouette */}
      <path
        d="M13.5 5.5C14.33 5.5 15 4.83 15 4S14.33 2.5 13.5 2.5S12 3.17 12 4S12.67 5.5 13.5 5.5Z"
        fill="currentColor"
      />
      <path
        d="M9.8 8.9L7 23H9.1L10.9 15L13 17V23H15V15.5L12.2 12.5L13 9.5C14.1 10.8 15.5 11.5 17 11.5V9.5C16 9.5 15.1 9 14.5 8.2L13.5 7C13.1 6.4 12.5 6 11.8 6C11.4 6 11.1 6.1 10.8 6.3L6 9.2V14H8V10.6L9.8 8.9Z"
        fill="currentColor"
      />
      {/* Motion lines for dynamic effect */}
      <path
        d="M2 12H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M1 15H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M3 18H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
};

export default RunningIcon;
