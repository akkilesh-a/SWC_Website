import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import OfficeBearers from "./office-bearers";
import DirectorNote from "./director-note";
import { OfficeBearer } from "@/sanity/types";
import AnnouncementCard from "./announcement";

const ALL_OFFICE_BEARERS_QUERY = defineQuery(`*[
  _type == "officeBearer"
]{
  _id,
  name,
  designation,
  description,
  image
}`);

export default async function OfficeBearersAndAnnouncements() {
  try {
    const data = await client.fetch(ALL_OFFICE_BEARERS_QUERY);
    const director = data.find(
      (bearer: OfficeBearer) => bearer.designation === "Director",
    );
    const officeBearers = data.filter(
      (bearer: OfficeBearer) => bearer.designation !== "Director",
    );
    return (
      <div>
        <DirectorNote director={director} />
        <AnnouncementCard />
        <OfficeBearers officeBearers={officeBearers} />
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
