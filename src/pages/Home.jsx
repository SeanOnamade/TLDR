import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import axios from 'axios'

function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://newsapi-r8fr.onrender.com/wired-pick-of-day")
      .then((response) => {
        setData(response.data); // Set the fetched data into state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(err); // Set the error if something goes wrong
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getStoryName = (link) => {
    const parts = link.split("/");
    if (parts[parts.length - 1] === "") {
      parts.pop(); // Remove the last element if it is empty
    }
    const storySlug = parts[parts.length - 1];
    return storySlug
      .replace(/-/g, " ") // Replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  return (
    <div className="flex-col">
      <header className="text-center">
        <h1
          className={`mt-4 mb-8 text-4xl font-black transition-all duration-300 ease-in-out ${
            isShrunk ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-white">FOCUS.</span>
          <span className="text-[#F51555]">FEED</span>
        </h1>
      </header>

      <main className="flex-col justify-center px-[50px]">
        <section className="h-[390px] bg-[#FFFFFF1A] rounded-[15px] shadow-lg mb-5">
          <div className="flex w-full h-full p-1.5">
            <img
              src="../../public/images/image.png"
              alt="placeholder"
              className="object-cover w-[50%] h-full rounded-[10px]"
            />
            <div className="w-full h-full p-4">
              <h1 className="text-white text-2xl font-bold mb-4 line-clamp-[1]">
                {data ? getStoryName(data.article_link) : "Loading..."}
              </h1>
              {loading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {data && (
                <div className="text-white text-[16px] line-clamp-[10] mb-4">
                  {data.article_text.split("\n").map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              )}
              <a
                href={data ? data.article_link : ""}
                className="text-[#F51555] text-[14px] font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more {">"}
              </a>
            </div>
          </div>
        </section>
        <div className="font-bold text-white mt-12">TRENDING</div>
        <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
        <section className="flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="w-full py-4">
                    <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                      <CardContent className="flex-column h-full items-center justify-center p-1.5">
                        <img
                          src="../../public/images/image.png"
                          alt="placeholder"
                          className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                        />
                        <p className="text-white text-[12px] line-clamp-[6] m-1 mb-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Fusce ac auctor nisl. In sed hendrerit metus.
                          Proin malesuada quam id ultrices consectetur. Integer
                          efficitur tristique posuere. Donec turpis tortor,
                          consequat et porttitor quis, porttitor congue purus.
                          Phasellus luctus malesuada fringilla. Nunc purus
                          velit, gravida in leo vitae, facilisis commodo ante.
                          Fusce sit amet tincidunt nulla, sit amet varius ipsum.
                          Nulla sed magna et mauris gravida posuere ut nec
                          neque.
                        </p>
                        <p className="text-[#F51555] text-[12px] ml-1 font-bold">
                          Read more {">"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={"null"} />
            <CarouselNext variant={"null"} />
          </Carousel>
        </section>
        <div className="font-bold text-white mt-8">RECENT</div>
        <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
        <section className="flex justify-center mb-24">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="w-full py-4">
                    <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                      <CardContent className="flex-column h-full items-center justify-center p-1.5">
                        <img
                          src="../../public/images/image.png"
                          alt="placeholder"
                          className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                        />
                        <p className="text-white text-[12px] line-clamp-[6] m-1 mb-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Fusce ac auctor nisl. In sed hendrerit metus.
                          Proin malesuada quam id ultrices consectetur. Integer
                          efficitur tristique posuere. Donec turpis tortor,
                          consequat et porttitor quis, porttitor congue purus.
                          Phasellus luctus malesuada fringilla. Nunc purus
                          velit, gravida in leo vitae, facilisis commodo ante.
                          Fusce sit amet tincidunt nulla, sit amet varius ipsum.
                          Nulla sed magna et mauris gravida posuere ut nec
                          neque.
                        </p>
                        <p className="text-[#F51555] text-[12px] ml-1 font-bold">
                          Read more {">"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={"null"} />
            <CarouselNext variant={"null"} />
          </Carousel>
        </section>
      </main>
    </div>
  );
}

export default Home;
