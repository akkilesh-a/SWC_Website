import React from "react";
import { LandingImageWithContent } from "../components";
import { OfficeBearersAndAnnouncements } from "../components/homepage";
import { Heading, Text } from "../components/ui";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div>
      <LandingImageWithContent
        variant="image"
        image="/swc-logos/swc-logo-white.png"

      />
      <div>
        <StudentWelfareCommitteeDescription />
      </div>
      <OfficeBearersAndAnnouncements />
      <Footer />
    </div>
  );
};

const StudentWelfareCommitteeDescription = () => {
  return (
    <div id="swc-description" className="text-center flex flex-col justify-center items-center space-y-4 p-16 bg-[#F6F6F6] dark:bg-transparent">
      <Heading>Student Welfare Committee</Heading>
      <div className="w-[400px] md:w-[700px] font-inter">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex,
          elementum eu velit ac, porta semper justo. Donec laoreet dapibus mi
          faucibus dictum. Nullam semper diam ac diam condimentum posuere.
          Suspendisse potenti. Nunc sapien mi, mattis a justo vitae, porta
          placerat velit. Maecenas rutrum ligula non sodales varius. Nulla et
          risus sed felis porttitor eleifend. Donec vitae venenatis arcu. Nulla
          facilisi. Pellentesque commodo facilisis tempus.
        </Text>
      </div>
    </div>
  );
};

export default Home;
