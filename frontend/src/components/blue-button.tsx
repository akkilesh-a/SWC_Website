import { Button } from "./ui/button";
import { ReactNode } from "react";
import {motion} from "motion/react"

const BlueButton = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: 0      
       }}
      whileInView={{ 
        opacity: 1,
        scale: 1       
       }}
      transition={{ duration: 0.5 }}
    >
      <Button className="bg-[#00195E] font-newsreader hover:bg-[#00194E] text-white text-[20px] font-normal leading-[34.28px] text-center w-[300px] h-[65px] rounded-tl-[11px] underline-offset-auto decoration-auto">
        {children}
      </Button>
    </motion.div>
  );
};

export default BlueButton;
