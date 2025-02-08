import Image from "next/image";
import { urlFor } from "../../constants/sanity";
import { Heading } from "../ui";
import { OfficeBearer } from "@/sanity/types";

interface OfficeBearersProps {
  officeBearers: OfficeBearer[];
}

export default function OfficeBearers({ officeBearers }: OfficeBearersProps) {
  if (!officeBearers || officeBearers.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>No Office Bearers Found</Heading>
      </div>
    );
  }

  // Separate the director from other office bearers
  const director = officeBearers.find(
    (bearer) => bearer.designation === "Director",
  );
  const otherBearers = officeBearers.filter(
    (bearer) => bearer.designation !== "Director",
  );

  return (
    <div className="flex flex-col items-center p-8">
      <Heading>Office Bearers</Heading>

      {/* First Row: Director */}
      {director && (
        <div className="flex justify-center mb-8">
          <div className="flex flex-col space-y-4 items-center text-center">
            <Image
              src={
                director.image
                  ? urlFor(director.image)?.url() ||
                    "https://placehold.co/263x362/png"
                  : "https://placehold.co/263x362/png"
              }
              alt={director.name || "Director"}
              width={363.02}
              height={459.41}
              className="overflow-hidden"
            />
            <div className="space-y-2">
              <p className="font-semibold mt-4 text-3xl">{director.name}</p>
              <p className="text-2xl text-gray-600">{director.designation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Second Row: Other Office Bearers */}
      <div className="flex flex-wrap justify-center gap-[101px] mx-16">
        {otherBearers.map((bearer: OfficeBearer) => {
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
                <p className="font-semibold mt-4 text-2xl">{bearer.name}</p>
                <p className="text-lg text-gray-600">{bearer.designation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
