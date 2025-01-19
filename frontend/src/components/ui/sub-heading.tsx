import React, { ReactNode } from "react";

const SubHeading = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`text-xl sm:text-2xl md:text-3xl lg:text-5xl font-newsreader ${className}`}
    >
      {children}
    </div>
  );
};

export default SubHeading;
