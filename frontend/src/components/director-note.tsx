import Image from "next/image";
import { urlFor } from "../constants/sanity";
import { Heading, Text } from "./ui";
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center w-[100%]">
      <div className="col-span-2 text-center md:text-left space-y-4 px-16">
        <Heading>Director&apos;s Note</Heading>

        <Text>{director.description}</Text>
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={403}
          height={345}
        />
      </div>
    </div>
  );
}
