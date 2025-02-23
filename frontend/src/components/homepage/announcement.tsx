"use client";

import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Heading,
  Text,
} from "../ui";
import { Announcement } from "@/sanity/types";
import Autoplay from "embla-carousel-autoplay";

const ANNOUNCEMENTS_QUERY = defineQuery(
  `*[_type == "announcement"]{
    _id,
    title,
    description,
    date,
    expiry,
    category
  }`,
);

const Announcements = () => {
  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetApi = (api: any) => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  };

  useEffect(() => {
    async function fetchAnnouncements() {
      const data = await client.fetch(ANNOUNCEMENTS_QUERY);
      setAnnouncementsData(data);
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <div className="md:px-16 lg:px-28 xl:px-40 py-16 text-center space-y-8">
        <Heading>Announcements</Heading>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            Loading..
          </div>
        ) : (
          <>
            <Carousel
              setApi={handleSetApi}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {announcementsData.map((announcement) => (
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                    key={announcement._id}
                  >
                    <AnnouncementCard announcement={announcement} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <DotsThingy
              count={announcementsData.length}
              activeIndex={activeIndex}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Announcements;

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
  return (
    <div className="relative">
      <div className="flex justify-center"></div>
      <div className="bg-darkblue h-32 flex items-center justify-center py-4 text-white px-2">
        <Text>{announcement.title}</Text>
      </div>
    </div>
  );
};

const getDotClass = (
  idx: number,
  activeIndex: number,
  count: number,
): string => {
  if (idx === activeIndex) return "bg-blue-700";
  const leftNeighbor = (activeIndex - 1 + count) % count;
  const rightNeighbor = (activeIndex + 1) % count;
  if (idx === leftNeighbor || idx === rightNeighbor) return "bg-blue-500";
  return "bg-blue-300";
};

const isEllipse = (
  idx: number,
  activeIndex: number,
  count: number,
): boolean => {
  const leftNeighbor = (activeIndex - 1 + count) % count;
  const rightNeighbor = (activeIndex + 1) % count;
  return idx === activeIndex || idx === leftNeighbor || idx === rightNeighbor;
};

const DotsThingy = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: count }).map((_, idx) => {
        const shapeClass = isEllipse(idx, activeIndex, count)
          ? "w-3 h-2"
          : "w-2 h-2";
        return (
          <div
            key={idx}
            className={`rounded-full mx-1 ${getDotClass(
              idx,
              activeIndex,
              count,
            )} ${shapeClass}`}
          ></div>
        );
      })}
    </div>
  );
};
