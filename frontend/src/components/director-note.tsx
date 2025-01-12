import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import { urlFor } from "../constants/sanity";
import { SubHeading, Text } from "./ui";

const DIRECTOR_FETCH_QUERY = defineQuery(`*[
  _type == "officeBearer" && designation == "Director"
]{
  _id,
  name,
  designation,
  description,
  image
}`);

export default async function DirectorNote() {
  try {
    const data = await client.fetch(DIRECTOR_FETCH_QUERY);

    const director = data[0];

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
      <div className="flex flex-col md:flex-row justify-center items-center p-8 space-y-16 md:space-y-0 md:space-x-32">
        <div className="max-w-[526px] text-center md:text-left space-y-4">
          <SubHeading className="underline">Director&apos;s Note</SubHeading>

          <Text>{director.description}</Text>
        </div>

        <div className="max-w-[403px] w-full">
          <Image
            src={imgURL || "https://placehold.co/550x310/png"}
            alt={director.name || "Director"}
            width={403}
            height={345}
            className="rounded-lg w-full h-auto"
          />
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
