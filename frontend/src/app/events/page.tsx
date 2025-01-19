"use client";

import { LandingImageWithContent } from "@/components";
import { client } from "@/sanity/client";
import { Calendar, MapPin, Search, User } from "lucide-react";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/constants/sanity";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  Input,
} from "@/components/ui";
import { Club, Event } from "@/sanity/types";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
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
    const filteredData = events.filter((event) => {
      return (
        event.name?.toLowerCase().includes(search.toLowerCase()) ||
        event.venue?.toLowerCase().includes(search.toLowerCase())
      );
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
        <div className="grid min-h-[100vh] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.map((event) => {
              return (
                <EventPosterWithDetailsCard key={event._id} data={event} />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

function EventPosterWithDetailsCard({ data }: { data: Event }) {
  const imgURL = data.poster
    ? urlFor(data.poster)?.url()
    : "https://placehold.co/550x310/png";

  const clubs = data.clubname as unknown as Club[];

  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-white flex flex-col ">
          <Image
            src={imgURL!}
            alt="poster"
            className=""
            width={400}
            height={100}
          />
          <div className="bg-darkblue w-full h-[10rem] p-2 flex flex-col justify-between">
            {/* Event Name and Clubs */}
            <div className="flex text-left justify-between">
              <div>
                <div className="w-[11rem] text-lg sm:text-sm text-white truncate font-bold ">
                  {data.name}
                </div>
                {clubs?.map((club, index) => {
                  return (
                    <div className="text-xs" key={index}>
                      {club.name} {index < clubs.length - 1 && ","}
                    </div>
                  );
                })}
              </div>
              <div className="text-xl font-bold">
                {data.entryFee != 0 ? "$" + data.entryFee : "Free"}
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex justify-between text-sm sm:text-[0.6rem]">
              <div className="flex items-center gap-2">
                <Calendar />
                <div className="space-y-2">
                  <div>
                    {data.startDate
                      ? new Date(data.startDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : ""}
                  </div>
                  <div>
                    {data.endDate
                      ? new Date(data.endDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-end gap-2 text-xs">
                  <User /> {data.noOfParticipantsPerTeam}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <MapPin /> {data.venue?.slice(0, 1).toUpperCase()}
                  {data.venue?.slice(1, 20)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2  justify-center space-x-4 md:space-x-16 min-w-[70vw] max-w-[90vw] h-[90vh]">
        <DialogTitle className="flex justify-center items-center overflow-auto">
          <Image
            src={imgURL!}
            alt={data.name + " Poster"}
            className="sm:block hidden"
            width={500}
            height={1000}
          />
          <Image
            src={imgURL!}
            alt={data.name + " Poster"}
            className="block sm:hidden"
            width={400}
            height={1000}
          />
        </DialogTitle>
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="text-xl sm:text-4xl font-semibold">{data.name}</div>
            <div className="text-sm sm:text-base text-left">
              {data.description}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="sm:w-10 sm:h-10 w-8 h-8" />
              <div className="flex flex-col">
                <div>
                  {data.startDate
                    ? new Date(data.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : ""}
                </div>
                <div>
                  {data.endDate
                    ? new Date(data.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="sm:w-10 sm:h-10 w-8 h-8" />
              <div className="flex flex-col">
                <div>
                  {data.venue?.slice(0, 1).toUpperCase()}
                  {data.venue?.slice(1, 20)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EventsPage;
