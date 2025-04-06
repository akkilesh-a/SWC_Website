"use client";

import { AlignJustify, ArrowLeftSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui";
import { ModeToggle } from "./mode-toggle";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const NavBarLinks = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "About",
    url: "/about",
  },
  {
    text: "Events",
    url: "/events",
  },
  {
    text: "News Letter",
    url: "/newsletter",
  },
  {
    text: "Clubs",
    url: "/clubs",
  },
];

const NavBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showHam, setshowHam] = useState(false);

  // Close the hamburger menu when clicked outside
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (showHam && !ref.current?.contains(event.target as HTMLDivElement)) {
        setshowHam(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, showHam]);

  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("down");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = latest - prev;
  
    if (Math.abs(diff) > 5) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });
    

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: scrollDirection === "up" ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`bg-darkblue/90 dark:bg-black/90 shadow-md backdrop-blur-lg transition-all duration-300 z-50 flex fixed top-0 left-0 w-screen justify-between items-center h-[8vh] px-4 text-white`}
      >
      <Link href="/">
        <Image
          className="dark:hidden"
          src="/swc-logos/swc-logo-white-cropped.png"
          alt="logo"
          height={100}
          width={200}
        />
        <Image
          className="hidden dark:block w-auto h-[25vh]"
          src="/swc-logos/swc-logo-gold.png"
          alt="logo"
          height={10}
          width={20}
        />
      </Link>
      <div
        className={`hidden md:flex gap-x-10 items-center px-8 font-sansation`}
      >
        {NavBarLinks.map((link, index) => (
          <Link
            key={index}
            className="text-white dark:text-[#c6901e] dark:font-bold"
            href={link.url}
          >
            {link.text}
          </Link>
        ))}
        <ModeToggle />
      </div>
      <div className="md:hidden text-white">
        <Button
          className="bg-darkblue dark:bg-transparent dark:text-white rounded-lg hover:bg-blue-900"
          onClick={() => setshowHam((val) => !val)}
          size="icon"
          type="button"
        >
          <AlignJustify />
        </Button>
      </div>
      {showHam && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-darkblue/95 dark:bg-black/90 h-screen md:hidden absolute right-0 top-0 z-50  w-80 px-8 py-4 rounded-lg"
          ref={ref}
        >
          <Button
            className="bg-darkblue dark:bg-transparent dark:text-white rounded-lg hover:bg-blue-900"
            onClick={() => setshowHam((val) => !val)}
            size="icon"
            type="button"
          >
            <ArrowLeftSquare />
          </Button>
          <div className="flex flex-col gap-y-8 items-center">
            {NavBarLinks.map((link, index) => (
              <Link key={index} className="" href={link.url}>
                {link.text}
              </Link>
            ))}
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NavBar;