import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <div className="bg-[#00194E] flex justify-between items-center h-[8vh] px-4">
      <div>
        <Image
          src="/swc-logos/swc-logo-white-cropped.png"
          alt="logo"
          height={100}
          width={200}
        />
      </div>
      <div className={`flex gap-x-10 items-center px-8 font-sansation`}>
        {NavBarLinks.map((link, index) => {
          return (
            <Link key={index} className="text-white" href={link.url}>
              {link.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
