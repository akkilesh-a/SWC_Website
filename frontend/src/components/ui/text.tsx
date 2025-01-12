import React, { ReactNode } from "react";

const Text = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return <div className={` ${className}`}>{children}</div>;
};

export default Text;
