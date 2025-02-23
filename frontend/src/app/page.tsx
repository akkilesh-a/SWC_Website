"use client";

import React, { useEffect } from "react";
import { LandingImageWithContent } from "../components";
import { OfficeBearersAndAnnouncements } from "../components/homepage";
import { Heading, Text } from "../components/ui";
import { BlueButton } from "../components";
import { motion } from "motion/react";
import Lenis from "lenis";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis();
    // @ts-expect-error - TODO: Fix this
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <LandingImageWithContent
        variant="image"
        image="/swc-logos/swc-logo-white.png"
      />
      <StudentWelfareCommitteeDescription />
      <OfficeBearersAndAnnouncements />
    </div>
  );
};

const StudentWelfareCommitteeDescription = () => {
  return (
    <div
      id="swc-description"
      className="md:px-16 lg:px-28 xl:px-40 py-16 text-center flex flex-col justify-center items-center space-y-4  bg-[#F6F6F6] dark:bg-transparent"
    >
      <Heading>Student Welfare Committee</Heading>
      <motion.div
        initial={{
          translateX: 100,
          opacity: 0,
        }}
        whileInView={{
          translateX: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="md:w-[500px] lg:w-[1100px] font-inter "
      >
        <Text className="text-balance">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex,
          elementum eu velit ac, porta semper justo. Donec laoreet dapibus mi
          faucibus dictum. Nullam semper diam ac diam condimentum posuere.
          Suspendisse potenti. Nunc sapien mi, mattis a justo vitae, porta
          placerat velit. Maecenas rutrum ligula non sodales varius. Nulla et
          risus sed felis porttitor eleifend. Donec vitae venenatis arcu. Nulla
          facilisi. Pellentesque commodo facilisis tempus.
        </Text>
      </motion.div>
      <motion.div
        initial={{
          translateX: -100,
          opacity: 0,
        }}
        whileInView={{
          translateX: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="md:w-[500px] lg:w-[1100px] font-inter "
      >
        <Text className="text-balance">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex,
          elementum eu velit ac, porta semper justo. Donec laoreet dapibus mi
          faucibus dictum. Nullam semper diam ac diam condimentum posuere.
          Suspendisse potenti. Nunc sapien mi, mattis a justo vitae, porta
          placerat velit. Maecenas rutrum ligula non sodales varius. Nulla et
          risus sed felis porttitor eleifend. Donec vitae venenatis arcu. Nulla
          facilisi. Pellentesque commodo facilisis tempus.
        </Text>
      </motion.div>
      <BlueButton>More About SWC</BlueButton>
    </div>
  );
};

export default Home;
