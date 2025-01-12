import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import { urlFor } from "../constants/sanity";

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
    // Fetch data directly in the server component
    const data = await client.fetch(DIRECTOR_FETCH_QUERY);

    // Assuming there's only one Director, take the first result
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
        {/* Director's Note Section */}
        <div className="max-w-[526px] text-center md:text-left">
          {/* Director's Note Title */}
          <h1 className="text-6xl md:text-[84px] font-semibold leading-tight tracking-tighter underline underline-offset-8 decoration-2">
            Director's Note
          </h1>

          {/* Director's Description */}
          <p className="mt-4 text-lg">{director.description}</p>
        </div>

        {/* Director's Image Section */}
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
    // Handle errors
    console.error(err);
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
}