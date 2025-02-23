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
import { Club, Event, Venue } from "@/sanity/types";

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"]{
    _id,
    name,
    isCollab,
    clubnames[]->{name, abbreviation},
    clubname->{name, abbreviation},
    typeOfEvent,
    customEventType,
    description,
    poster,
    startDate,
    endDate,
    customVenueOption,
    venue[]->{venueName, locationLink},
    customVenue,
    entryFee,
    noOfParticipantsPerTeam
  }
`);

const CustomCalendarIcon = ({
  className = "w-6 h-6",
}: {
  className?: string;
}) => {
  return (
    <svg
      width="14"
      height="15"
      className={className}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.8694 12.7757H1.48367V4.96832H11.8694M9.64387 0V1.41952H3.70918V0H2.22551V1.41952H1.48367C0.660234 1.41952 0 2.05121 0 2.83904V12.7757C0 13.1522 0.156315 13.5132 0.434557 13.7794C0.7128 14.0457 1.09018 14.1952 1.48367 14.1952H11.8694C12.2629 14.1952 12.6402 14.0457 12.9185 13.7794C13.1967 13.5132 13.353 13.1522 13.353 12.7757V2.83904C13.353 2.46256 13.1967 2.1015 12.9185 1.83529C12.6402 1.56908 12.2629 1.41952 11.8694 1.41952H11.1275V0M10.3857 7.80737H6.67652V11.3562H10.3857V7.80737Z"
        fill="white"
      />
    </svg>
  );
};

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

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
      const venue = event.venue as unknown as Venue[];
      const venueNames = venue?.map((venue) => venue.venueName);
      const club = event.clubname as unknown as Club;
      const clubs = event.clubnames as unknown as Club[];
      let clubNames: string[] = [];
      clubNames.push(club?.name!);
      clubs?.map((club) => clubNames.push(club.name!));

      return (
        event.name?.toLowerCase().includes(search.toLowerCase()) ||
        venueNames?.some((venue) =>
          venue?.toLowerCase().includes(search.toLowerCase()),
        ) ||
        clubNames?.some((club) =>
          club?.toLowerCase().includes(search.toLowerCase()),
        )
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
    : "https://placehold.co/300x400/png";

  const clubs = data.clubnames as unknown as Club[];
  const club = data.clubname as unknown as Club;
  const venue = data.venue as unknown as Venue[];

  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-white flex flex-col ">
          <Image src={imgURL!} alt="poster" width={400} height={100} />
          <div className="bg-darkblue w-full p-2 flex flex-col gap-2">
            {/* Event Tags */}
            {/* <div className="flex flex-row flex-wrap text-sm gap-2">
              {data.typeOfEvent?.map((type,index)=>{
                return(
                  <div className="bg-white text-darkblue px-1 py-[0.5px] " key={index}>
                    {type}
                  </div>
                )
              })}
            </div> */}
            {/* Event Name and Clubs */}
            <div className="flex text-left justify-between">
              <div className="space-y-1">
                {/* Event Name */}
                <div className="w-[12rem] text-sm text-white truncate font-bold ">
                  {data.name}
                </div>
                {/* Clubs */}
                {data.isCollab ? (
                  clubs?.map((club, index) => {
                    return (
                      <div className="text-xs" key={index}>
                        {club.name} {index < clubs.length - 1 && ","}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-xs">{club.name}</div>
                )}
              </div>
              <div className="text-sm font-bold">
                {data.entryFee != 0 ? "₹" + data.entryFee : "Free"}
              </div>
            </div>
            {/* Date and Time */}
            <div className="flex justify-between text-sm sm:text-[0.65rem]">
              <div className="flex items-center gap-2">
                {/* <Calendar className="sm:w-10 sm:h-10 w-8 h-8" /> */}
                <CustomCalendarIcon />
                <div className="text-left">
                  {/* Timings for one day events */}
                  {data.startDate?.slice(0, 10) ===
                    data.endDate?.slice(0, 10) && (
                    <div>
                      {data.startDate?.slice(11, 16) +
                        " - " +
                        data.endDate?.slice(11, 16)}
                    </div>
                  )}

                  {/* Date for one day events */}
                  <div className="sm:text-[0.85rem]">
                    {data.startDate?.slice(0, 10) ===
                      data.endDate?.slice(0, 10) &&
                      data.startDate &&
                      new Date(data.startDate).getDate() +
                        getOrdinalSuffix(new Date(data.startDate).getDate()) +
                        " " +
                        new Date(data.startDate).toLocaleDateString("en-GB", {
                          month: "long",
                        })}
                  </div>

                  {/* Start Date for multi day events */}
                  {data.startDate?.slice(0, 10) !==
                    data.endDate?.slice(0, 10) && (
                    <div>
                      {data.startDate
                        ? new Date(data.startDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : ""}
                    </div>
                  )}

                  {/* End Date for multi day events */}
                  {data.startDate?.slice(0, 10) !==
                    data.endDate?.slice(0, 10) && (
                    <div>
                      {data.endDate
                        ? new Date(data.endDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : ""}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-end gap-2 text-xs">
                  <User className="w-5 h-5" fill="white" />{" "}
                  {data.noOfParticipantsPerTeam}
                </div>
                <div className="flex justify-end gap-2 items-end">
                  <MapPin className="w-5 h-5" fill="white" />
                  <div>
                    {venue && venue[0].venueName}
                    {data.customVenueOption && data.customVenue}
                  </div>
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
              {/* {data.description} */}
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
                  {/* {data.venue?.slice(0, 1).toUpperCase()} */}
                  {/* {data.venue?.slice(1, 20)} */}
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
