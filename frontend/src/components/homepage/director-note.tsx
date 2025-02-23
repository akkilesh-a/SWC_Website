import Image from "next/image";
import { urlFor } from "../../constants/sanity";
import { Heading, Text } from "../ui";
import { OfficeBearer } from "@/sanity/types";
import { motion } from "motion/react";

interface DirectorNoteProps {
  director: OfficeBearer | null;
}

export default function DirectorNote({ director }: DirectorNoteProps) {
  if (!director) {
    return (
      <div className="flex justify-center items-center h-screen">
        No Director found.
      </div>
    );
  }

  const imgURL = director.image
    ? urlFor(director.image)?.url()
    : "https://placehold.co/550x310/png";

  return (
    <div className="md:px-16 lg:px-28 xl:px-64 py-16 space-y-4 md:space-y-0 flex flex-col md:flex-row items-center justify-around w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="md:hidden flex w-full justify-center"
      >
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={350}
          height={300}
          className="rounded-lg"
        />
      </motion.div>

      <div>
        <Heading className="md:text-left text-center">
          Director&apos;s Note
        </Heading>
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 2, type: "spring" }}
          className="flex w-full justify-center"
        >
          <Text className="md:w-96 text-center md:text-left">
            {director.description}
          </Text>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, translateX: 80 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="hidden md:block overflow-x-hidden"
      >
        <Image
          src={imgURL || "https://placehold.co/550x310/png"}
          alt={director.name || "Director"}
          width={400}
          height={340}
        />
      </motion.div>
    </div>
  );
}
