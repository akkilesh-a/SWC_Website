import React from 'react';
import { Button } from './ui/button';

interface BlueButtonProps {
  text: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({ text }) => {
  return (
    <div>
      <Button
        className="bg-[#00194E] hover:bg-[#00194E] text-white font-dmSerifText text-[25px] font-normal leading-[34.28px] text-center w-[364px] h-[81px] rounded-tl-[11px]"
        style={{
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
          
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default BlueButton;