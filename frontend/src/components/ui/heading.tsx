import React, { ReactNode } from "react";

const Heading = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl underline decoration-[3px] font-dmSerifDisplay ${className}`}
    >
      {children}
    </div>
  );
};

export default Heading;
