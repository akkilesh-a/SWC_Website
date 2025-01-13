import Image from "next/image";
import { urlFor } from "../constants/sanity";
import { SubHeading, Text } from "./ui";
import { OfficeBearer } from "@/sanity/types";

interface OfficeBearersProps {
  officeBearers: OfficeBearer[];
}

export default function OfficeBearers({ officeBearers }: OfficeBearersProps) {
  if (!officeBearers || officeBearers.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Office Bearers found.
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center p-8">
      <SubHeading>Office Bearers</SubHeading>
      {/* Images */}
      <div className="flex flex-wrap justify-center gap-[101px] mx-16">
        {officeBearers.map((bearer: OfficeBearer) => {
          const imgURL = bearer.image
            ? urlFor(bearer.image)?.url()
            : "https://placehold.co/263x362/png";

          return (
            <div
              key={bearer._id}
              className="flex flex-col space-y-4 items-center text-center"
            >
              <Image
                src={imgURL || "https://placehold.co/263x362/png"}
                alt={bearer.name || "Office Bearer"}
                width={263.02}
                height={362.41}
                className="overflow-hidden"
              />
              <div className="space-y-2">
                <Text className="font-semibold mt-4 text-lg">
                  {bearer.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {bearer.designation}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
