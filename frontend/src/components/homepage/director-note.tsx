import Image from "next/image";
import { urlFor } from "../../constants/sanity";
import { Heading, Text } from "../ui";
import { OfficeBearer } from "@/sanity/types";

interface DirectorNoteProps {
  director: OfficeBearer | null;
}

export default function DirectorNote({ director }: DirectorNoteProps) {
  if (!director) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Director found.
      </div>
    );
  }

  const imgURL = director.image
    ? urlFor(director.image)?.url()
    : "https://placehold.co/550x310/png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 items-center justify-center w-full p-4 md:p-8 lg:p-12">
      <div className="md:hidden flex justify-center">
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={350}
          height={300}
          className="rounded-lg"
        />
      </div>

      <div className="col-span-2 text-center md:text-left px-4 md:px-8 lg:px-12 lg:pl-[250px] lg:py-[157px] md:py-6 lg:py-8 space-y-2">
        <Heading className="w-full md:w-[450px] pb-2 md:pb-3">
          Director&apos;s Note
        </Heading>
        <Text className="w-full md:w-[380px]  lg:w-[400px] text-justify lg:text-left">
          {director.description}
        </Text>
      </div>

      <div className="hidden md:flex justify-center items-center lg:-ml-[250px]">
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={400}
          height={340}
        />
      </div>
    </div>
  );
}
