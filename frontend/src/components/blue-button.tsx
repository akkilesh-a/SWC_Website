import { Button } from "./ui/button";
import { ReactNode } from "react";

const BlueButton = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Button className="bg-[#00195E] font-newsreader hover:bg-[#00194E] text-white text-[20px] font-normal leading-[34.28px] text-center w-[300px] h-[65px] rounded-tl-[11px] underline-offset-auto decoration-auto">
        {children}
      </Button>
    </div>
  );
};

export default BlueButton;
