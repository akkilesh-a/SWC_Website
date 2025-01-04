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
    <div className="bg-[#00194E] flex justify-between items-center h-[8vh]">
      <div className="relative w-[400px] h-[150px]">
        <Image
          src="/swc-logos/swc-logo-white.png"
          alt="logo"
          layout="fill" 
          objectFit="cover"
        />
      </div>
      <div className="flex gap-x-10 items-center px-8">
        {NavBarLinks.map((link, index) => {
          return <Links key={index} text={link.text} url={link.url} />;
        })}
      </div>
    </div>
  );
};

const Links =({text,url}:{text:string , url:string})=>{
  return (
    <Link className="text-white" href ={url}>
      {text}
    </Link>
  );
}

export default NavBar;
