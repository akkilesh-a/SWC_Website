'use client'

import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { urlFor } from "../../constants/sanity";
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
import Autoplay from "embla-carousel-autoplay"

// import { Dot } from "lucide-react";

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
  const [announcementsData, setAnnouncementsData] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      const data = await  client.fetch(ANNOUNCEMENTS_QUERY)
      setAnnouncementsData(data)
      setLoading(false)
    }
    fetchAnnouncements()
  }, [])
  

  return (
    <div>
      <div className="text-center py-24 space-y-8">
        <Heading>Announcements</Heading>
        {loading ?
          <div className="flex justify-center items-center h-screen ">
            Loading..
          </div>
          :
          <Carousel
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
              {announcementsData.map((announcement, index) => {
                return (
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                    key={index}
                  >
                    <AnnouncementCard announcement={announcement} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            {/* <DotsThingy index={data.length} /> */}
          </Carousel> 
        }
      </div>
    </div>
  )
}

export default Announcements

// export default async function Announcements() {
//   const data: Announcement[] = await client.fetch(ANNOUNCEMENTS_QUERY);

//   return (
//     <div className="bg-gray-100 dark:bg-transparent py-10 space-y-10 px-16">
//       <div className="text-center">
//         <Heading>Announcements</Heading>
//       </div>
//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//       >
//         <CarouselContent>
//           {data.map((announcement, index) => {
//             return (
//               <CarouselItem
//                 className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
//                 key={index}
//               >
//                 <AnnouncementCard announcement={announcement} />
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//         {/* <DotsThingy index={data.length} /> */}
//       </Carousel>
//     </div>
//   );
// }

// const DotsThingy =({index}:{index:number})=>{
//   return(
//     <div className="flex gap-2">
//       {Array.from({length:index}).map((_,index)=>{
//         return <Dot key={index} className={index === index ? "bg-darkblue" : "bg-gray-300"}  />
//       })}
//     </div>
//   )
// }

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
  // const imgURL = announcement.category
  //   ? urlFor(announcement.category)?.url()
  //   : "https://placehold.co/550x310/png";
  return (
    <div className="relative">
      <div className="flex justify-center">
        {/* <Image
          src={imgURL!}
          width={400}
          height={200}
          className=""
          alt={announcement.title || "Announcement"}
        /> */}
      </div>
      {/* <div className="bg-darkblue absolute left-8 -bottom-1 h-16 md:h-24 w-64 md:w-96 flex items-center justify-left py-0 text-white px-2">
        <Text>{announcement.title}</Text>
      </div> */}
      <div className="bg-darkblue h-32 flex items-center justify-center py-4 text-white px-2">
        <Text>{announcement.title}</Text>
      </div>
    </div>
  );
};
