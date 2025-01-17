// @ts-nocheck
"use client";

import { LandingImageWithContent } from "@/components";
import { client } from "@/sanity/client";
import { Calendar, MapPin, Search, User } from "lucide-react";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { urlFor } from "@/constants/sanity";
import { Input } from "@/components/ui";

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"]{
    _id,
    name,
    typeOfEvent,
    description,
    image,
    poster,
    startDate,
    endDate,
    clubname[]->{name},
    venue,
    entryFee,
    noOfParticipantsPerTeam
  }
`);

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(EVENTS_QUERY);
      setEvents(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = events.filter((event: any) => {
      return event.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredEvents(filteredData);
  }, [search]);

  const data = search ? filteredEvents : events;

  return (
    <div className="space-y-16">
      <LandingImageWithContent
        variant="text"
        heading="Events"
        subheading="Student Welfare Committee"
      />
      <div className="md:p-[10%] lg:p-[5%] flex flex-col space-y-16 items-center sm:p-[5%]">
        <div className="flex w-[50%] relative justify-center items-center text-[#9C9C9C] ">
          <Input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-[#EBEBEB] px-8 rounded-md"
          />
          <Search className="absolute left-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-16">
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.map((event: any) => {
              return <PostersSection key={event._id} data={event} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

function PostersSection({ data }: { data: any }) {
  const imgURL = data.poster
    ? urlFor(data.poster)?.url()
    : "https://placehold.co/550x310/png";

  return (
    <div className="text-white flex flex-col items-center">
      <Image src={imgURL!} alt="poster" className="" width={300} height={100} />
      <div className="bg-darkblue h-[10rem] p-2 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <div className="w-[11rem] text-white truncate font-bold text-sm">
              {data.name}
            </div>
            <div className="flex text-xs">
              {data.clubname.map((club: any, index: number) => {
                return (
                  <span className="truncate" key={index}>
                    {club.name} {index < data.clubname.length - 1 && ","}{" "}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="text-sm font-bold">
            {data.entryFee != 0 ? "$" + data.entryFee : "Free"}
          </div>
        </div>
        <div className="w-[70%] h-[5rem] text-[0.6rem] ">
          {data.description.slice(0, 90)}...
        </div>
        <div className="flex justify-between text-[0.6rem]">
          <div className="flex items-center gap-2">
            <Calendar />
            <div className="space-y-2">
              <div>{data.startDate.split("T")[0]}</div>
              <div>{data.endDate.split("T")[0]}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2 text-xs">
              <User /> {data.noOfParticipantsPerTeam}
            </div>
            <div className="flex items-center justify-end gap-2">
              <MapPin /> {data.venue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
