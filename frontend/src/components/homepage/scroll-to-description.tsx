"use client";

import React from "react";

const ScrollToDescriptionButton = () => {
  const scrollToDescription = () => {
    const section = document.getElementById("swc-description");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      className="absolute bottom-0 w-[85px] h-[24px] sm:w-[100px] sm:h-[40px] md:w-[120px] md:h-[46px] lg:w-[140px] lg:h-[52px] xl:w-[161px] xl:h-[57px] left-1/2 transform -translate-x-1/2 bg-[#FFFFFFD4] hover:bg-[#FFFFFFD4] text-black p-2 sm:p-3 md:p-4 rounded-t-[11px] rounded-b-none"
      onClick={scrollToDescription}
    >
      <div className="font-inter text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
        See more
      </div>
    </button>
  );
};

export default ScrollToDescriptionButton;
