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
      className={`font-newsreader text-sm lg:text-base xl:text-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Text;
