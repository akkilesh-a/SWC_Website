"use client";

import React from "react";
import { Button, Text } from "../ui";

const ScrollToDescriptionButton = () => {
  const scrollToDescription = () => {
    const section = document.getElementById("scroll-to-component");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      variant="secondary"
      className="absolute bottom-0 left-[50%] -translate-x-1/2 font-bold rounded-t-xl rounded-b-none dark:bg-[#09090b] dark:text-white px-8 py-6"
      onClick={scrollToDescription}
    >
      <Text>
        See more
      </Text>
    </Button>
  );
};

export default ScrollToDescriptionButton;
