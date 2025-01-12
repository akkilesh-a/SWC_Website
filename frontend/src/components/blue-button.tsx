import { Button } from './ui/button';
import { ReactNode } from 'react'; // Import ReactNode type

const BlueButton = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Button
        className="bg-[#00194E] hover:bg-[#00194E] text-white font-dmSerifText text-[25px] font-normal leading-[34.28px] text-center w-[364px] h-[81px] rounded-tl-[11px] underline-offset-auto decoration-auto"
      >
        {children} {/* Render children inside the button */}
      </Button>
    </div>
  );
};

export default BlueButton;