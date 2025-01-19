import { Heading, SubHeading } from "./ui";
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
              className="lg:block hidden"
              height={300}
              alt={heading || "Image"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
