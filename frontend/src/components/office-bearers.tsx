import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { OfficeBearer } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "../constants/sanity";

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
    // Fetch data directly in the server component
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
        {/* Title */}
        <h1 className="text-[80px] font-semibold leading-[123.39px] text-center underline underline-offset-[2.5%] decoration-solid decoration-skip-ink">
          Office Bearers
        </h1>

        {/* Single Row with Flex Wrap */}
        <div className="flex flex-wrap justify-center gap-[101px] mx-16">
          {officeBearers.map((bearer: OfficeBearer) => {
            const imgURL = bearer.image
              ? urlFor(bearer.image)?.url()
              : "https://placehold.co/263x362/png";

            return (
              <div
                key={bearer._id}
                className="flex flex-col items-center text-center"
              >
                {/* Office Bearer Image */}
                <Image
                  src={imgURL || "https://placehold.co/263x362/png"}
                  alt={bearer.name || "Office Bearer"}
                  width={263.02}
                  height={362.41}
                  className="overflow-hidden" // No rounding
                />

                {/* Office Bearer Name */}
                <h2 className="mt-4 text-lg font-semibold">{bearer.name}</h2>

                {/* Office Bearer Designation */}
                <p className="text-sm text-gray-600">{bearer.designation}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (err) {
    // Handle errors
    console.error(err);
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
}