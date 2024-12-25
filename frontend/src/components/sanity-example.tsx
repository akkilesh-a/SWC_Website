"use client";

import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { OfficeBearer } from "@/sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import Image from "next/image";
import { useEffect, useState } from "react";

const EXAMPLE_QUERY = defineQuery(`*[
  _type == "officeBearer"
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

const SanityExample = () => {
  const [loading, setLoading] = useState(true);
  const [officeBearers, setOfficeBearers] = useState<OfficeBearer[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOfficeBearers() {
      try {
        const data = await client.fetch(EXAMPLE_QUERY);
        setOfficeBearers(data);
      } catch (err:unknown) {
        setError("Failed to fetch data. Please try again later.");
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    fetchOfficeBearers();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Example fetch from Sanity</h1>
      {loading && <div className="animate-bounce">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && officeBearers && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
          {officeBearers.map((officeBearer) => {
            const imgURL = officeBearer.image
              ? urlFor(officeBearer.image)?.url()
              : "https://placehold.co/550x310/png";

            return (
              <li className="bg-white p-4 rounded-lg shadow-md" key={officeBearer._id}>
                <div className="flex justify-center">
                  <Image
                    src={imgURL || "https://placehold.co/550x310/png"}
                    alt={officeBearer.name || "Event"}
                    height="200"
                    width="200"
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{officeBearer.name}</h2>
                <h4 className="text-lg font-semibold underline">{officeBearer.designation}</h4>
                <p className="mt-1">{officeBearer.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SanityExample;
