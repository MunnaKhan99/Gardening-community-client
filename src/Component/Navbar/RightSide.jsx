import React from "react";

const RightSide = ({ full = false }) => {
    return (
        <div className={full ? "w-full" : ""}>
            <button
                className={`
          w-full sm:w-auto
          px-5 py-2 rounded-full
          text-sm font-medium
          text-white
          bg-[var(--color-primary)]
          hover:bg-[var(--color-primary-hover)]
          transition-colors
        `}
            >
                Login / Register
            </button>
        </div>
    );
};

export default RightSide;
