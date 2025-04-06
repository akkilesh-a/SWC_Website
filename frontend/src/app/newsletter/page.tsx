import { LandingImageWithContent } from "@/components";
import { Heading, SubHeading } from "@/components/ui";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import { ArrowDownToLine } from "lucide-react";
import { format } from "date-fns";
import { urlFor } from "@/constants/sanity";
import Image from "next/image";

const FETCH_NEWSLETTERS = defineQuery(`*[
    _type=="newsletter"
  ]{
    _id,
    link,
    date,
    pdfFile,
    coverPhoto
  }`);

async function NewsLettersPage() {
  const data = await client.fetch(FETCH_NEWSLETTERS);

  // console.log(data)

  // Sort by date descending
  const sortedNewsletters = [...data].sort(
    (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );

  const latestNewsletter = sortedNewsletters[0];

  const newslettersByYear = sortedNewsletters.reduce((acc, newsletter) => {
    const year = new Date(newsletter.date!).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(newsletter);
    return acc;
  }, {} as Record<number, typeof sortedNewsletters>);

  return (
    <div>
      <LandingImageWithContent
        variant="text"
        heading="News Letters"
        subheading="Student Welfare Committee"
        backgroundImage="/vit-chennai-entrance.png"
      />

      <div id="scroll-to-component" className="bg-white flex flex-col items-center justify-center p-16">
        {/* Featured Latest Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="text-center lg:text-left md:pr-8">
            <Heading>Latest Newsletter</Heading>
            <SubHeading>{format(new Date(latestNewsletter.date!), "MMMM yyyy")}</SubHeading>
            <p className="lg:text-left text-center mb-8 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sem ex, elementum eu velit ac, porta semper justo.
            </p>
          </div>
          <iframe
            className="bg-white border border-white w-[400px] sm:w-[500px] md:w-[700px] h-[500px]"
            key={latestNewsletter._id}
            src={
              latestNewsletter.link?.startsWith("https://online")
                ? latestNewsletter.link
                : `https://online.${latestNewsletter.link?.slice(8)}`
            } 
          />         
        </div>

        {/* 2024 Edition Section */}
        <div className="w-full p-[100px]">
        {Object.entries(newslettersByYear)
          .sort((a, b) => Number(b[0]) - Number(a[0])) // Sort years descending
          .map(([year, newsletters]) => (
            <div key={year} className="w-full  p-[100px]">
              <div className="w-full inline-block border-b-[2px] border-black leading-none pb-0.5 mb-[100px] font-newsreader font-bold text-[29.97px] md:text-[30px] lg:text-[50px] xl:text-[60px]">
                {year} Editions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {(newsletters).map((newsletter, index) => {
                  const formattedMonth = format(new Date(newsletter.date!), "MMMM yyyy");
                  const imgURL = newsletter.coverPhoto
                                  ? urlFor(newsletter.coverPhoto)?.url()
                                  : "https://placehold.co/300x400/png";
                  if(newsletter.link){
                    const fixedLink = newsletter.link.startsWith("https://online")
                      ? newsletter.link
                      : `https://online.${latestNewsletter.link?.slice(8)}`;

                    return (
                      <div key={newsletter._id || index} className="flex flex-col items-center">
                        <Image src={imgURL!} alt={newsletter.date!} width={250} height={300}/>
                        <a
                          href={fixedLink}
                          target="_blank"
                          className="bg-blue-900 text-white px-4 py-2 w-[250px] flex justify-between items-center mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <CircleArrowRightIcon className="h-7 w-7" />
                            <span>Read now</span>
                          </div>
                        </a>
                        <p>{formattedMonth}</p>
                      </div>
                    );
                  }else{
                    return(
                      <div key={newsletter._id || index} className="flex flex-col items-center">
                        <Image src={imgURL!} alt={newsletter.date!} width={250} height={300}/>
                        <div
                          className="bg-blue-900 text-white px-4 py-2 w-[250px] flex justify-between items-center mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <CircleArrowRightIcon className="h-7 w-7" />
                            <span>Read now</span>
                          </div>
                          <ArrowDownToLine className="h-6 w-6" />
                        </div>
                        <p>{formattedMonth}</p>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default NewsLettersPage;

const CircleArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9999 31.1666C24.8242 31.1666 31.1666 24.8242 31.1666 16.9999C31.1666 9.17567 24.8242 2.83325 16.9999 2.83325C9.17567 2.83325 2.83325 9.17567 2.83325 16.9999C2.83325 24.8242 9.17567 31.1666 16.9999 31.1666ZM17.6658 11.9991C17.865 11.8001 18.135 11.6884 18.4166 11.6884C18.6981 11.6884 18.9682 11.8001 19.1674 11.9991L23.4174 16.2491C23.6164 16.4483 23.7282 16.7184 23.7282 16.9999C23.7282 17.2815 23.6164 17.5515 23.4174 17.7508L19.1674 22.0008C19.0701 22.1051 18.9528 22.1889 18.8225 22.2469C18.6922 22.3049 18.5514 22.3352 18.4087 22.3362C18.2659 22.3372 18.1245 22.3089 17.993 22.2529C17.8616 22.197 17.7434 22.1146 17.6462 22.0105C17.549 21.9064 17.4746 21.7829 17.4275 21.6479C17.3804 21.5128 17.3614 21.3693 17.3716 21.2266C17.3818 21.0839 17.421 20.9447 17.4865 20.8181C17.552 20.6914 17.6422 20.5803 17.7516 20.4924L20.4941 17.7499H11.3332C11.0517 17.7499 10.7817 17.6382 10.5825 17.439C10.3833 17.2398 10.2716 16.9698 10.2716 16.6883C10.2716 16.4068 10.3833 16.1368 10.5825 15.9376C10.7817 15.7384 11.0517 15.6266 11.3332 15.6266H20.4941L17.7516 12.8841C17.5526 12.685 17.4408 12.4151 17.4408 12.1336C17.4408 11.8521 17.5526 11.5821 17.7516 11.383Z"
      fill="white"
    />
  </svg>
);