import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [dataArray, setDataArray] = useState([]);
  const endpoints = [
    {
      endpoint: "/economist-pick-of-day",
      image: "image1.webp",
    },
    { endpoint: "/AP-pick-of-day", image: "image2.webp" },
    { endpoint: "/vogue-pick-of-day", image: "image3.webp" },
    {
      endpoint: "/rolling-stone-movies-tv-pick-of-day",
      image: "image4.webp",
    },
    { endpoint: "/people-pick-of-day", image: "image5.webp" },
    { endpoint: "/democracy-now-pick-of-day", image: "image6.webp" },
    // { endpoint: "/weather-news", image: "image7.webp" },
    // { endpoint: "/SCMP-pick-of-day", image: "image8.webp" },
    // { endpoint: "/SCMP-china-top-story", image: "image9.webp" },
    // { endpoint: "/cosmo-style-pick-of-day", image: "image10.webp" },
    // { endpoint: "/world-news", image: "image11.webp" },
    // { endpoint: "/techcrunch-pick-of-day", image: "image12.webp" },
    // { endpoint: "/zdnet-pick-of-day", image: "image13.webp" },
    // { endpoint: "/yahoo-sports", image: "image14.webp" },
    // { endpoint: "/weather-channel-pick-of-day", image: "image15.webp" },
    // { endpoint: "/weather-gov-pick-of-day", image: "image16.webp" },
    // { endpoint: "/yahoo-sports-recap", image: "image17.webp" },
    // { endpoint: "/yahoo-finance-pick-of-day", image: "image18.webp" },
    // { endpoint: "", image: "image19.webp" },
    // { endpoint: "/forbes-pick-of-day", image: "image20.webp" },
    // { endpoint: "/finance-news", image: "image21.webp" },
    // { endpoint: "/fashion-news", image: "image22.webp" },
    // { endpoint: "/tech-news", image: "image23.webp" },
    // { endpoint: "/entertainment-news", image: "image24.webp" },
  ];

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

  // TODO: Get these to load in indivdually instead of all at once
  // This will allow them to load as fast as possible for each
  // And I will also be able to add the fade in on load effect
  useEffect(() => {
    console.log("here")

    Promise.all(
      endpoints.map(({ endpoint }) =>
        axios.get(`https://newsapi-r8fr.onrender.com${endpoint}`)
      )
    )
      .then((responses) => {
        const combinedData = responses.map((response, index) => ({
          data: response.data, // The response data
          image: endpoints[index].image, // Corresponding image
        }));
        setDataArray(combinedData); // Store combined data
      })
      .catch((err) => {
        console.error(err); // Handle errors
      });
  }, []);

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
              src="../../images/image.png"
              alt="placeholder"
              className="object-cover w-[50%] h-full rounded-[10px]"
            />
            <div className="w-full h-full p-4">
              {loading && (
                <div>
                  <Skeleton className="h-8 w-[80%] mb-5" />
                  <Skeleton className="h-20 w-full mb-3" />
                  <Skeleton className="h-24 w-full mb-3" />
                  <Skeleton className="h-16 w-[90%] mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                </div>
              )}
              <div
                className={`transition-opacity delay-50 duration-300 ease-in-out ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                <h1 className="text-white text-2xl font-bold mb-4 line-clamp-[1]">
                  {data && data.article_title}
                </h1>
                <div className="text-white text-[16px] line-clamp-[10] mb-4">
                  {data &&
                    data.article_text.split("\n").map((line, index) => {
                      const bulletLine = line
                        .replace(/\*/g, "")
                        .replace(/^\d+\.\s*/, "• ");
                      return (
                        <p key={index} className="mb-2">
                          {bulletLine}
                        </p>
                      );
                    })}
                </div>
              </div>
              <a
                href={data ? data.article_link : ""}
                className={`text-[#F51555] text-[14px] font-bold transition-opacity delay-50 duration-300 ease-in-out ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
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
              {dataArray.length === 0 &&
                Array.from({ length: endpoints.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5 ">
                          <Skeleton className="h-[50%] w-full mb-2 rounded-[10px]" />
                          <Skeleton className="h-[30px] w-full mb-1" />
                          <Skeleton className="h-[70px] w-full mb-2" />
                          <Skeleton className="h-[10px] w-20" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              {dataArray.length > 0 &&
                dataArray.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <img
                            src={`../../home_images/${item.image}`}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                          />
                          <h1 className="text-white text-[13px] font-bold ml-1 line-clamp-[1]">
                            {item.data && item.data.article_title}
                          </h1>
                          <div className="text-white text-[12px] line-clamp-[5] m-1 mb-0">
                            {item.data &&
                              item.data.article_text
                                .split("\n")
                                .map((line, index) => {
                                  const bulletLine = line
                                    .replace(/\*/g, "")
                                    .replace(/^\d+\.\s*/, "• ");
                                  return <p key={index}>{bulletLine}</p>;
                                })}
                          </div>
                          <a
                            href={item.data ? item.data.article_link : ""}
                            className="text-[#F51555] text-[12px] ml-1 font-bold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more {">"}
                          </a>
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
              {dataArray.length === 0 &&
                Array.from({ length: endpoints.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5 ">
                          <Skeleton className="h-[50%] w-full mb-2 rounded-[10px]" />
                          <Skeleton className="h-[30px] w-full mb-1" />
                          <Skeleton className="h-[70px] w-full mb-2" />
                          <Skeleton className="h-[10px] w-20" />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              {dataArray.length > 0 &&
                dataArray.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
                          <img
                            src={`../../home_images/${item.image}`}
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                          />
                          <h1 className="text-white text-[13px] font-bold line-clamp-[1] ml-1">
                            {item.data && item.data.article_title}
                          </h1>
                          <div className="text-white text-[12px] line-clamp-[5] m-1 mb-0">
                            {item.data &&
                              item.data.article_text
                                .split("\n")
                                .map((line, index) => {
                                  const bulletLine = line
                                    .replace(/\*/g, "")
                                    .replace(/^\d+\.\s*/, "• ");
                                  return <p key={index}>{bulletLine}</p>;
                                })}
                          </div>
                          <a
                            href={item.data ? item.data.article_link : ""}
                            className="text-[#F51555] text-[12px] ml-1 font-bold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more {">"}
                          </a>
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
