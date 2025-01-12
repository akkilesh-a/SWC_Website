import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { OfficeBearer } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "../constants/sanity";
import { SubHeading, Text } from "./ui";

const OFFICE_BEARERS_QUERY = defineQuery(`*[
  _type == "officeBearer" && designation!="Director" 
]{
  _id,
  name,
  designation,
  image
}`);

export default async function OfficeBearers() {
  try {
    const officeBearers = await client.fetch(OFFICE_BEARERS_QUERY);

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
                  <Text className="font-semibold">{bearer.name}</Text>
                  <Text className="text-sm text-gray-600">{bearer.designation}</Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to fetch data. Please try again later or Refresh the page.
      </div>
    );
  }
}