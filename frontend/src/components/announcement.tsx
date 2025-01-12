import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import React from "react";
import Image from "next/image";
import { urlFor } from "../constants/sanity";
import { Heading, Text, Card, CardHeader, CardContent } from "./ui";
import { Announcement } from "@/sanity/types";
import Link from "next/link";
import { ArrowUpRightFromSquare } from "lucide-react";

const EXAMPLE_QUERY = defineQuery(
  `*[_type == "announcement"]{
    _id,
    title,
    description,
    date,
    expiry,
    category
  }`,
);

export default async function AnnouncementCard() {
  const data: Announcement[] = await client.fetch(EXAMPLE_QUERY);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="mb-8 text-center">
        <Heading className="underline font-dmSerifDisplay text-4xl md:text-7xl lg:text-7xl">
          Announcements
        </Heading>
      </div>
      <div className="px-32 space-y-8 md:space-y-0 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-start">
        {data.map((announcement, index) => {
          const imgURL = announcement.category
            ? urlFor(announcement.category)?.url()
            : "https://placehold.co/550x310/png";
          return (
            <Card key={index}>
              <CardHeader className="flex justify-center">
                <Image
                  src={imgURL!}
                  width={1000}
                  height={200}
                  className=""
                  alt={announcement.title || "Announcement"}
                />
              </CardHeader>
              <CardContent className="space-y-4">
                <Text className="font-dmSerifDisplay text-3xl">
                  {announcement.title}
                </Text>
                <Text>{announcement.description?.slice(0, 300)}...</Text>
                <div className="flex justify-between items-center">
                  <Text className="flex justify-end">
                    {announcement.date?.slice(0, 10)}
                  </Text>
                  <Link href={`/announcement/${announcement._id}`}>
                    <ArrowUpRightFromSquare className="text-blue-700 hover:text-blue-500" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
