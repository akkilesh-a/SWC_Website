"use client";

import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { OfficeBearer } from "@/sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Image from "next/image";
import { useEffect, useState } from "react";

const EXAMPLE_QUERY = defineQuery(`*[
  _type == "officeBearer" && designation == "Director"
]{
  _id,
  name,
  designation,
  description,
  image
}`);

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const DirectorNote = () => {
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState<OfficeBearer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDirector() {
      try {
        const data = await client.fetch(EXAMPLE_QUERY);
        // Assuming there's only one Director, take the first result
        setDirector(data[0]);
      } catch (err: unknown) {
        setError("Failed to fetch data. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDirector();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen animate-bounce">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!director) {
    return <div className="flex justify-center items-center h-screen">No Director found.</div>;
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
      <div className="max-w-[403px]">
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={403}
          height={345}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default DirectorNote;