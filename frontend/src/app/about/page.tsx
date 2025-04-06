import { LandingImageWithContent } from "@/components";
import { Heading, SubHeading, Text } from "@/components/ui";
import Image from "next/image";
import React from "react";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/constants/sanity";
import { OfficeBearer } from "@/sanity/types";

const OFFICE_BEARERS_QUERY = defineQuery(`*[
  _type == "officeBearer" && designation != "Director"
  ]{
    _id,
    name,
    designation,
    description,
    image, 
    informalImage,
    _type, 
    _createdAt, 
    _updatedAt, 
    _rev 
  }`);

const OfficeBearerCard = ({
  name,
  designation,
  description,
  informalImage,
  isAlternate,
}: {
  name: string;
  designation: string;
  description: string;
  informalImage: string;
  isAlternate: boolean;
}) => (
  <div
    className={`flex flex-col items-center ${isAlternate ? "md:flex-row-reverse" : "md:flex-row"} w-[100%]`}
  >
    <Image
      src={informalImage || "/about/placeholder.png"}
      className="w-1/2 h-1/2 md:w-[50%] md:h-[85vh] object-cover"
      width={800}
      height={800}
      alt="About"
    />

    <div className="flex flex-col justify-center md:p-12 md:space-y-3 md:w-1/2">
      <SubHeading className={`underline flex justify-center  ${isAlternate ? "md:justify-end" : "md:justify-start"}`}>
        {name}
      </SubHeading>
      <Text className={`pt-1 md:text-3xl xl:text-4xl font-bold flex justify-center ${isAlternate? "md:justify-end" : "md:justify-start"}`}>
        {designation}
      </Text>
      <div className={`flex ${isAlternate? "md:justify-end" : "md:justify-start"}`}>
      <Text className={`flex justify-center text-center ${isAlternate? "md:text-end" : "md:text-start"} p-9 md:w-[35vw]  md:p-0`}>
        {description}
      </Text>
      </div>

    </div>
  </div>
);
const AboutPage = async () => {
  const officeBearersData = await client.fetch(OFFICE_BEARERS_QUERY);

  return (
    <div>
      <LandingImageWithContent
        variant="text"
        heading="About"
        subheading="Student Welfare Committee"
        backgroundImage="/vit-chennai-entrance.png"
      />
      <Heading className="text-center mt-2 md:hidden">
        Student Welfare Committee
      </Heading>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Image
          src="/about/placeholder.png"
          className=" mt-8 md:mt-0 w-1/2 h-1/2 md:w-[50%] md:h-[auto] lg:h-[100vh] xl:w-[40vw] xl:h-[100vh]"
          width={700}
          height={100}
          alt="About"
        />
        <div className=" flex flex-col items-center justify-center text-center space-y-8 xl:w-[60vw]">
          <div>
            <Heading className=" hidden md:block text-center md:mb-2 md:p-3 lg:p-0">
              Student Welfare Committee
            </Heading>
            <div className="mt-8 px-8 md:space-y-0 md:mt-0 space-y-4 md:w-auto 2xl:px-40 ">
              <Text className="lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                sem ex, elementum eu velit ac, porta semper justo. Donec laoreet
                dapibus mi faucibus dictum. Nullam semper diam ac diam
                condimentum posuere. Suspendisse potenti. Nunc sapien mi, mattis
                a justo vitae, porta placerat velit. Maecenas rutrum ligula non
                sodales varius. Nulla et risus sed felis porttitor eleifend.
                Donec vitae venenatis arcu. Nulla facilisi. Pellentesque commodo
                facilisis tempus.
              </Text>
              <Text className="lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                sem ex, elementum eu velit ac, porta semper justo. Donec laoreet
                dapibus mi faucibus dictum. Nullam semper diam ac diam
                condimentum posuere. Suspendisse potenti. Nunc sapien mi, mattis
                a justo vitae.
              </Text>
            </div>
          </div>
        </div>
      </div>
      <Heading className="text-center py-2 md:hidden">Our Mission</Heading>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center w-[100%]">
        <div className="text-center mt-4 md:w-[50%] xl:w-[60vw]">
          <Heading className="hidden md:block">Our Mission</Heading>
          <div className="space-y-4 px-8 md:space-y-0 2xl:px-40">
            <Text className="lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem
              ex, elementum eu velit ac, porta semper justo. Donec laoreet
              dapibus mi faucibus dictum. Nullam semper diam ac diam condimentum
              posuere. Suspendisse potenti. Nunc sapien mi, mattis a justo
              vitae, porta placerat velit. Maecenas rutrum ligula non sodales
              varius. Nulla et risus sed felis porttitor eleifend. Donec vitae
              venenatis arcu. Nulla facilisi. Pellentesque commodo facilisis
              tempus.
            </Text>
            <Text className="lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem
              ex, elementum eu velit ac, porta semper justo. Donec laoreet
              dapibus mi faucibus dictum. Nullam semper diam ac diam condimentum
              posuere. Suspendisse potenti. Nunc sapien mi, mattis a justo
              vitae.
            </Text>
          </div>
        </div>
        <Image
          src="/about/placeholder.png"
          className="w-1/2 h-1/2 md:w-[50%] xl:w-[40vw] xl:h-[100vh]"
          width={800}
          height={100}
          alt="About"
        />
      </div>

      <div>
        <Heading className="flex justify-center p-2">Office Bearers</Heading>
        {officeBearersData.map((officeBearer: OfficeBearer, index: number) => {
          const imgUrl = officeBearer.informalImage
            ? urlFor(officeBearer.informalImage)?.url()
            : "/about/placeholder.png";
          return (
            <OfficeBearerCard
              key={index}
              isAlternate={index % 2 !== 0}
              name={officeBearer.name!}
              designation={officeBearer.designation!}
              description={officeBearer.description!}
              informalImage={imgUrl!}
            />
          );
        })}
      </div>
      <div className="bg-gray-100 flex flex-col justify-center items-center">
        <Heading className="underline p-2 flex justify-center">
          Student Council
        </Heading>
        <Image
          src="/about/placeholder.png"
          className="w-1/2 h-1/2 md:w-[60vw] md:h-[60vh] "
          width={800}
          height={100}
          alt="About"
        />
        <div className="flex flex-col justify-center md:text-xl lg:text-3xl pt-3">
          <Text>Lorem ipsum something something</Text>
          <Text className="flex justify-center">Student welfare council</Text>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
