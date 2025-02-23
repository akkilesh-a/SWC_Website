"use client";

import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import OfficeBearers from "./office-bearers";
import DirectorNote from "./director-note";
import { OfficeBearer } from "@/sanity/types";
import Announcements from "./announcement";
// import BlueButton from "../blue-button";
// import Link from "next/link";
import { useEffect, useState } from "react";

const ALL_OFFICE_BEARERS_QUERY = defineQuery(`*[
  _type == "officeBearer"
]{
  _id,
  name,
  designation,
  description,
  image
}`);

const OfficeBearersAndAnnouncements = () => {
  const [officeBearers, setOfficeBearers] = useState<OfficeBearer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOfficeBearers = async () => {
      try {
        const data = await client.fetch(ALL_OFFICE_BEARERS_QUERY);
        setOfficeBearers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOfficeBearers();
  });

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          Loading..
        </div>
      ) : (
        <div>
          <DirectorNote
            director={
              officeBearers.find((bearer) => bearer.designation === "Director")!
            }
          />
          <Announcements />
          <OfficeBearers officeBearers={officeBearers} />
        </div>
      )}
    </div>
  );
};

export default OfficeBearersAndAnnouncements;

// export default async function OfficeBearersAndAnnouncements() {
//   try {
//     const data = await client.fetch(ALL_OFFICE_BEARERS_QUERY);
//     const director = data.find(
//       (bearer: OfficeBearer) => bearer.designation === "Director",
//     );
//     const officeBearers = data;
//     return (
//       <div>
//         <DirectorNote director={director} />
//         <Announcements />
//         <OfficeBearers officeBearers={officeBearers} />
//       </div>
//     );
//   } catch (err) {
//     console.error(err);
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         Failed to fetch data. Please try again later or Refresh the page.
//         <Link href="/"><BlueButton>Refresh</BlueButton></Link>
//       </div>
//     );
//   }
// }
