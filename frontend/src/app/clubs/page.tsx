
import { LandingImageWithContent } from "@/components";
import React from "react";
import Image from "next/image";
import { Heading, Text } from "@/components/ui";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/constants/sanity";
import { Club } from "@/sanity/types";

const CLUBS_QUERY = defineQuery(`*[
  _type == "club"]{
    _id,
    name,
    logo}`);

const ClubCard = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <div className="flex flex-col text-center p-16">
      <Image
        src={logo}
        className="w-[100%] h-[100%] object-contain"
        width={120}
        height={120}
        alt="Clubs"
      />
      <Text className="mt-2">{name}</Text>
    </div>
  );
};

const ClubsPage = async () => {
  const clubData = await client.fetch(CLUBS_QUERY);
  return (
    <div>
      <LandingImageWithContent
        variant="text"
        heading="Clubs"
        subheading="Student Welfare Committee"
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
        <div>Filter</div>
        <div className="grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:p-24">
          {clubData.map((clubData:Club , index:number) => {
            const imgUrl = clubData.logo ? urlFor(clubData.logo)?.url(): "/about/placeholder.png";
            return (
              <ClubCard name={clubData.name!} logo={imgUrl!} key={index} />
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
