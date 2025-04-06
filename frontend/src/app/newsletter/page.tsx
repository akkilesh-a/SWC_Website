import { LandingImageWithContent } from "@/components";
import { Heading } from "@/components/ui";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";

const FETCH_NEWSLETTERS = defineQuery(`*[
    _type=="newsletter"  
    ]{
      _id,
      link,
      date
    }`);

async function NewsLettersPage() {
  const data = await client.fetch(FETCH_NEWSLETTERS);
  // console.log(data)
  // const data=[
  //   {
  //     _id: '9a528bb5-6f58-4ba6-90d9-e0aee07c8369',
  //     link: 'https://online.pubhtml5.com/stgnz/oegu/',
  //     date: '2024-11-01'
  //   },
  //   {
  //     _id: '9d6d5dcd-2a28-484c-8be2-56bba4b0b0d2',
  //     link: 'https://online.pubhtml5.com/stgnz/natk',
  //     date: '2024-10-01'
  //   }
  // ]

  return (
    <div>
      <div>
      <LandingImageWithContent
        variant="text"
        heading="News Letters"
        subheading="Student Welfare Committee"
        backgroundImage="/vit-chennai-entrance.png"
      />
      </div>
      <div id="scroll-to-component" className="bg-white flex space-y-8 flex-col items-center justify-center p-16">
        <Heading>Latest Newsletter</Heading>
        <iframe
          className="bg-white border border-white w-[400px] sm:w-[600px] md:w-[1000px] h-[500px]"
          key={data[0]._id}
          src={data[0].link!}
        />
      </div>
    </div>
  );
}

export default NewsLettersPage;
