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
      className={`font-newsreader underline decoration-[2px] underline-offset-4 font-bold text-[29.97px] md:text-[30px] lg:text-[50px] xl:text-[60px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Heading;
