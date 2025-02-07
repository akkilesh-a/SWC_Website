import React from "react";
import Image from "next/image";

interface LandingImageWithContentProps {
  image?: string;
  heading?: string;
  subheading?: string;
  className?: string;
  variant: "image" | "text";
}

export const LandingImageWithContent = ({
  image,
  heading,
  subheading,
  className,
  variant,
}: LandingImageWithContentProps) => {
  return (
    <div>
      <div>
        <Image
          className="w-[100vw] h-[92vh]"
          src="/vit-chennai-campus.png"
          width={900}
          height={100}
          alt="VIT-Chennai"
        />
        <div className="absolute top-[250px]">
          <Image
            className="md:hidden"
            src="/home-page-trapezium.png"
            width={400}
            height={100}
            alt="homepage-trapezium-element"
          />
          <Image
            className="md:block lg:hidden hidden"
            src="/home-page-trapezium.png"
            width={500}
            height={100}
            alt="homepage-trapezium-element"
          />
          <Image
            className="lg:block hidden"
            src="/home-page-trapezium.png"
            width={800}
            height={100}
            alt="homepage-trapezium-element"
          />
          {/* Variant-Based Content */}
          {variant === "text" && (
            <div
              className={`absolute space-y-2 top-10 lg:top-16 left-4 text-white ${className}`}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl underline decoration-[3px]">
                {heading}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl SerifText">
                {subheading}
              </div>
            </div>
          )}
          {variant === "image" && image && (
            <div className="absolute lg:-top-[200px] md:-top-[150px] -top-[120px] -left-8">
              <Image
                src={image}
                width={400}
                height={300}
                className="md:hidden"
                alt={heading || "Image"}
              />
              <Image
                src={image}
                width={500}
                height={300}
                className="md:block lg:hidden hidden"
                alt={heading || "Image"}
              />
              <Image
                src={image}
                width={700}
                height={300}
                className="lg:block hidden"
                alt={heading || "Image"}
              />
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <button className="absolute bottom-0 w-[85px] h-[24px] sm:w-[100px] sm:h-[40px] md:w-[120px] md:h-[46px] lg:w-[140px] lg:h-[52px] xl:w-[161px] xl:h-[57px] left-1/2 transform -translate-x-1/2 bg-[#FFFFFFD4] hover:bg-[#FFFFFFD4] text-black p-2 sm:p-3 md:p-4 rounded-t-[11px] rounded-b-none">
          <div className="font-inter text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
            See more
          </div>
        </button>
      </div>
    </div>
  );
};
