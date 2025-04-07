import { Marquee } from "@/components";
import Image from "next/image";

const reviews = [
  {
    name: "MC",
    img: "/marquee/1.jpg",
  },
  {
    name: "Guest speech",
    img: "/marquee/2.png",
  },
  {
    name: "Lighting candle",
    img: "/marquee/3.png",
  },
  {
    name:"Independence Day",
    img: "/marquee/4.jpg",
  }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <div>
        <Image src={img} alt={name} height={300} width={400} />
    </div>
  );
};

export function MarqueeVertical() {
  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:20s] hidden sm:block">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s] hidden md:block">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
