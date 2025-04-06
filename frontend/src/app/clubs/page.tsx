"use client";

import { LandingImageWithContent } from "@/components";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heading, Text } from "@/components/ui";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/constants/sanity";
import { Club } from "@/sanity/types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui";
import { ExternalLink, Search, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const CLUBS_QUERY = defineQuery(`*[
  _type == "club"]{
    _id,
    name,
    logo,
    description,
    faculty1,
    faculty1url,
    faculty2,
    faculty2url,
    clubType}`);

const ClubCard = ({ data }: { data: Club }) => {
  const defaultImage = "/placeholder-image.jpg";
  const imgUrl = data.logo
    ? urlFor(data.logo)?.url() || defaultImage
    : defaultImage;

  return (
    <Dialog>
      <DialogTrigger className="flex flex-col text-center p-16 md:p-8 lg:p-16 hover:bg-gray-50 rounded-lg transition-colors duration-200">
        <Image
          src={imgUrl}
          className="w-[100%] h-[100%] object-contain"
          width={120}
          height={120}
          alt="Clubs"
        />
        <p className="mt-2 font-medium text-sm md:text-base">{data.name}</p>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[1200px] h-auto max-h-[90vh] p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <Image
              src={imgUrl}
              className="w-auto h-auto max-w-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[400px] object-contain"
              width={500}
              height={500}
              alt="Club Logo"
              quality={90}
              priority
            />
          </div>
          <div className="flex flex-col justify-between w-full h-full">
            <div className="space-y-3 md:space-y-4">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left font-bold">
                {data.name}
              </DialogTitle>
              <div className="border-t border-gray-200 pt-3"></div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                {data.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-4 md:mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col items-start">
                <p className="font-semibold text-gray-600 text-sm md:text-base">
                  Faculty Coordinator
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Link
                    href="data.faculty1url" 
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm md:text-base"
                  >
                    {data.faculty1}
                  </Link>
                  <Link
                    href="data.faculty1url "
                    target="_blank"
                  >
                    <ExternalLink
                      size={16}
                      className="text-blue-600 cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
              {data.faculty2 &&
                data.faculty2 !== "null" &&
                data.faculty2 !== "" &&
                data.faculty2 !== "NIL" &&
                data.faculty2 !== "nil" && (
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-gray-600 text-sm md:text-base">
                      Faculty Coordinator
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Link
                        href="data.faculty2url"
                        target="_blank"
                        className="text-blue-600 hover:underline text-sm md:text-base"
                      >
                        {data.faculty2}
                      </Link>
                      <Link
                        href="data.faculty2url"
                        target="_blank"
                      >
                        <ExternalLink
                          size={16}
                          className="text-blue-600 cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                )}

              {data.clubType && (
                <div className="flex flex-col items-start mt-2">
                  <p className="font-semibold text-gray-600 text-sm md:text-base">
                    Club Type
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs md:text-sm px-2.5 py-1 rounded-full mt-1">
                    {data.clubType}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState("");
  const [clubsLoading, setClubsLoading] = useState(true);

  const [clubTypes, setClubTypes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(CLUBS_QUERY);
      setClubs(data);
      setClubsLoading(false);

      const types = data.map((club: Club) => club.clubType).filter(Boolean);
      const uniqueTypes = Array.from(new Set(types)) as string[];
      setClubTypes(uniqueTypes);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = clubs.filter((club) => {
      if (!search) return true;

      if (clubTypes.includes(search)) {
        return club.clubType === search;
      }

      return (
        club.name?.toLowerCase().includes(search.toLowerCase()) ||
        club.abbreviation?.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredClubs(filteredData);
  }, [search, clubs, clubTypes]);

  const data = search ? filteredClubs : clubs;

  return (
    <div>
       <LandingImageWithContent
        variant="text"
        heading="Clubs"
        subheading="Student Welfare Committee"
        backgroundImage="/vit-chennai-entrance.png"
      />
      <div className="flex flex-col-reverse md:flex-row items-center w-[100%] h-[65%]">
        <div className="flex flex-col justify-center items-center text-center  md:w-[65%]">
          <Heading className="mt-2">Clubs At VIT Chennai</Heading>
          <Text className="flex px-8 md:px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem
            ex, elementum eu velit ac, porta semper justo. Donec laoreet dapibus
            mi faucibus dictum. Nullam semper diam ac diam condimentum posuere.
            Suspendisse potenti. Nunc sapien mi, mattis a justo vitae, porta
            placerat velit. Maecenas rutrum ligula non sodales varius. Nulla et
            risus sed felis porttitor eleifend. Donec vitae venenatis arcu.
            Nulla facilisi. Pellentesque commodo facilisis tempus.
          </Text>
        </div>
        <Image
          src="/about/placeholder.png"
          className="w-1/2 h-1/2 flex justify-center items-center mt-6 md:mt-0 md:h-[85vh] lg:w-[35%]"
          width={700}
          height={100}
          alt="About"
        />
      </div>
      <div>
        <Heading className="text-center">Explore</Heading>
        <div className="flex space-x-8 text-[#9C9C9C] max-w-4xl mx-auto mt-8 px-4">
          <div className="flex w-[50%] relative justify-center items-center">
            <Input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="bg-[#EBEBEB] px-8 rounded-md"
            />
            <Search className="absolute left-2" />
          </div>
          <div className="flex w-[50%] relative justify-center items-center text-[#9C9C9C]">
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  setSearch("");
                } else {
                  setSearch(value);
                }
              }}
            >
              <SelectTrigger className="bg-[#EBEBEB] w-[280px]">
                <div className="flex space-x-2 items-center">
                  <ListFilter />
                  <SelectValue placeholder="Select Club Type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#EBEBEB]">
                <SelectItem value="all">All Club Types</SelectItem>
                {clubTypes.map((type, index) => (
                  <SelectItem value={type} key={index}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:p-28 gap-8">
          {clubsLoading ? (
            <div>Loading...</div>
          ) : (
            data.map((clubData: Club, index: number) => {
              return <ClubCard data={clubData} key={index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
