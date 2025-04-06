import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#00205B] text-white relative">
      <div className="max-w-7xl mx-auto flex flex-col overflow-hidden md:flex-row items-start md:items-center sm:p-12 px-6 md:px-14">
        {/* Logo Section with Text Overlay */}
        <div className="relative sm:h-[300px] md:w-3/4 lg:h-[350px] md:h-[450px] text-center md:text-left md:-ml-12">
          {/* Image Container */}
          <div className="flex justify-center sm:p-4 sm:w-full md:justify-start">
            <Image
              src="/swc-logos/swc-logo-white-cropped.png"
              alt="Office of Student Welfare VIT Chennai Logo"
              className="mt-10 md:mt-20 md:ml-0 mx-auto md:mx-0"
              width={550}
              height={600}
            />
          </div>
          {/* Copyright Text */}
          <div className="hidden md:block">
            <p className="mt-4 md:mt-2 text-xs bg-[#00205B]/75 text-center  px-8 py-1 rounded-sm inline-block mx-auto md:mx-0">
              Copyright © Student Welfare Outreach 2025
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col md:flex-row w-full md:ml-[100px] mt-8 ">
          <div className="flex flex-col space-y-4 w-full md:w-1/2 text-center md:whitespace-nowrap md:text-right">
            <h2 className="font-dmSerifDisplay text-3xl text-left -ml-10 underline underline-offset-4 md:text-5xl">
              Contact Us
            </h2>
            <div className="text-md space-y-1">
              <p className="font-medium">
                Vellore Institute of Technology - Chennai
              </p>
              <p>Kelambakkam - Vandalur Rd, Rajan Nagar</p>
              <p>Chennai, Tamil Nadu</p>
              <p>600127</p>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="grid grid-cols-4 gap-y-4 w-full md:ml-[70px] md:-mb-12 md:mt-[70px] md:-mr-[150px] mt-8 md:mt-0 place-content-start text-center md:text-left">
            <Link
              href="mailto:chennai.directorsw@vit.ac.in"
              className="col-span-4 flex items-center justify-center md:justify-start hover:text-gray-200 transition-colors"
            >
              <Mail className="w-6 h-6 col-span-1" />
              <span className="text-md col-span-3 ml-4">
                chennai.directorsw@vit.ac.in
              </span>
            </Link>
            <Link
              href="https://instagram.com/studentwelfare_vitc"
              className="col-span-4 flex items-center justify-center md:justify-start hover:text-gray-200 transition-colors"
            >
              <Instagram className="w-6 h-6 col-span-1" />
              <span className="text-md col-span-3 ml-4">
                @studentwelfare_vitc
              </span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/dr-rajasekaran-v-94a25117/"
              className="col-span-4 flex items-center justify-center md:justify-start hover:text-gray-200 transition-colors"
            >
              <Linkedin className="w-6 h-6 col-span-1" />
              <span className="text-md col-span-3 ml-5">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="col-span-4 flex items-center justify-center md:justify-start hover:text-gray-200 transition-colors"
            >
              <span className="text-md col-span-3 ml-4 pb-4 md:hidden">
                Copyright © Student Welfare Outreach 2025
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
