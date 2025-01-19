import React, { ReactNode } from "react";

const Text = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={` text-xs font-newsreader sm:text-sm md:text-base lg:text-lg xl:text-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Text;
