import Image from "next/image";

interface LandingImageWithContentProps{
    image?:string;
    heading?:string;
    subheading?:string;
    className?:string;
    variant:"image" | "text";
}

export const LandingImageWithContent=({image,heading,subheading,className,variant}:LandingImageWithContentProps)=>{
    return(
        <div>
            <Image className='w-[100vw] h-[95vh]' src="/vit-chennai-campus.png" width={1000} height={100} alt='VIT-Chennai' />
            <div className='absolute top-[250px]'>
                <Image  src="/home-page-trapezium.png" width={850} height={100} alt='homepage-trapezium-element' />
                {/* Variant-Based Content */}
                {variant === "text" && (
                    <div className={`absolute space-y-2 top-16 left-12 text-white ${className}`}>
                        <h1 className="text-8xl underline decoration-[7px] font-dmSerifDisplay">{heading}</h1>
                        <p className=" text-3xl font-dmSerifText">{subheading}</p>
                    </div>
                )}
                {variant === "image" && image && (
                    <div className="absolute -top-[200px]">
                        <Image src={image} width={700} height={300} alt={heading || "Image"} />
                    </div>
                )}
            </div>
        </div>
    )
}
