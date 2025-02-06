"use client";

import { AlignJustify, ArrowLeftSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui";
import { ModeToggle } from "./mode-toggle";

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
    text: "TBD",
    url: "/tbd",
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

  return (
    <div className="bg-darkblue flex justify-between items-center h-[8vh] px-4 text-white">
      <div>
        <Image
          src="/swc-logos/swc-logo-white-cropped.png"
          alt="logo"
          height={100}
          width={200}
        />
      </div>
      <div
        className={`hidden md:flex gap-x-10 items-center px-8 font-sansation`}
      >
        {NavBarLinks.map((link, index) => {
          return (
            <Link key={index} className="text-white" href={link.url}>
              {link.text}
            </Link>
          );
        })}
        <ModeToggle />
      </div>
      <div className="md:hidden text-white">
        <Button
          className="bg-darkblue p-2 border rounded-lg hover:bg-blue-900"
          onClick={() => setshowHam((val) => !val)}
          size="icon"
          type="button"
        >
          <AlignJustify />
        </Button>
      </div>
      {showHam && (
        <div
          className="bg-darkblue md:hidden absolute right-0 top-0 z-40 h-full w-80 px-8 py-4 rounded-lg"
          ref={ref}
        >
          <Button
            className="bg-darkblue p-2 rounded-lg hover:bg-blue-900"
            onClick={() => setshowHam((val) => !val)}
            size="icon"
            type="button"
          >
            <ArrowLeftSquare />
          </Button>
          <div className="flex flex-col gap-y-8 items-center">
            {NavBarLinks.map((link, index) => {
              return (
                <Link key={index} className="" href={link.url}>
                  {link.text}
                </Link>
              );
            })}
            <ModeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
