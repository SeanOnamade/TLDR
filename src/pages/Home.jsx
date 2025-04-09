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
import axios from "axios";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  // New state for topics and grouped data
  const [userTopics, setUserTopics] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState(null);

  const handleScroll = () => {
    setIsShrunk(window.scrollY > 40);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user preferences (language and sources) from Firebase
  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPreferredLanguage(userData.language);
          setEndpoints(userData.sources || []);
          setUserTopics(userData.topics || []);
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };
    fetchUserPreferences();
  }, []);

  // Fetch a primary article (wired-pick-of-day)
  useEffect(() => {
    if (preferredLanguage) {
      axios
        .get(`https://newsapi-r8fr.onrender.com/wired-pick-of-day?language=${preferredLanguage}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [preferredLanguage]);

  // Once endpoints are loaded, fetch each source's data
  useEffect(() => {
    if (endpoints.length > 0 && preferredLanguage) {
      Promise.all(
        endpoints.map(({ endpoint }) =>
          axios.get(`https://newsapi-r8fr.onrender.com${endpoint}?language=${preferredLanguage}`)
        )
      )
        .then((responses) => {
          const combinedData = responses.map((response, index) => ({
            data: response.data,
            endpoint: endpoints[index],
          }));
          setDataArray(combinedData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [endpoints, preferredLanguage]);

  // Helper function to determine source image from article link
  const getSourceImage = (articleLink) => {
    try {
      const url = new URL(articleLink);
      const hostname = url.hostname.toLowerCase();
      if (hostname.includes("yahoo") && hostname.includes("finance"))
        return "YahooFinance.webp";
      if (hostname.includes("economist")) return "Economist.webp";
      if (hostname.includes("forbes")) return "Forbes.webp";
      if (hostname.includes("investopedia")) return "Investopedia.webp";
      if (hostname.includes("rollingstone")) return "RollingStone.webp";
      if (hostname.includes("apnews")) return "AP.webp";
      if (hostname.includes("vogue")) return "Vogue.webp";
      if (hostname.includes("people")) return "People.webp";
      if (hostname.includes("democracynow")) return "DemocracyNow.webp";
      if (hostname.includes("scmp") && hostname.includes("china"))
        return "SCMPTopStory.webp";
      if (hostname.includes("scmp")) return "SCMP.webp";
      if (hostname.includes("cosmo")) return "Cosmo.webp";
      if (hostname.includes("techcrunch")) return "TechCrunch.webp";
      if (hostname.includes("zdnet")) return "ZDNet.webp";
      if (hostname.includes("sports.yahoo")) return "YahooSports.webp";
      if (
        hostname.includes("weather.com") ||
        hostname.includes("weatherchannel")
      )
        return "WeatherChannel.webp";
      if (
        hostname.includes("wired.com")
      )
        return "Wired.webp";
      if (hostname.includes("weather.gov")) return "WeatherGov.webp";
      if (hostname.includes("techreport")) return "TechReport.webp";
      if (hostname.includes("infoq")) return "InfoQ.webp";
      if (hostname.includes("bbc")) return "BBC.webp";
      if (hostname.includes("npr")) return "NPR.webp";
      if (hostname.includes("japantimes")) return "JapanTimes.webp";
    } catch (e) {
      console.error("Error parsing URL", e);
    }
    return "default.webp"; // fallback image if no match
  };

  // Fetch grouped news for each user-selected topic
  useEffect(() => {
    if (userTopics.length > 0) {
      setLoadingTopics(true);
      Promise.all(
        userTopics.map((topic) => {
          const endpoint = `/${topic.toLowerCase()}-news`;
          return axios
            .get(`https://newsapi-r8fr.onrender.com${endpoint}`)
            .then((response) => ({ topic, articles: response.data }))
            .catch((err) => {
              console.error(`Error fetching ${topic} news:`, err);
              return { topic, articles: [] };
            });
        })
      )
        .then((responses) => {
          setGroupedData(responses);
        })
        .finally(() => {
          setLoadingTopics(false);
        });
    }
  }, [userTopics]);

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
        {/* Primary Article Section */}
        <section className="h-auto md:h-[390px] bg-[#FFFFFF1A] rounded-[15px] shadow-lg mb-5">
          <div className="flex flex-col md:flex-row w-full h-full p-1.5">
            <img
              src="../../home_images/Wired.webp"
              alt="Wired"
              className="object-cover w-full md:w-[50%] h-full rounded-[10px]"
            />
            <div className="w-full h-full p-4 pr-1">
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
                <div className="text-white text-[16px] overflow-y-auto max-h-[270px] mb-4 custom-scrollbar pr-3">
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

        {/* Trending Section using individual sources */}
        <div className="font-bold text-white mt-12">YOUR FEED</div>
        <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
        <section className="flex justify-center">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {dataArray.length === 0 &&
                Array.from({ length: endpoints.length }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5">
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
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="w-full py-4">
                      <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                        <CardContent className="flex-column h-full items-center justify-center p-1.5 pr-0">
                          <img
                            src={`../../home_images/${item.endpoint.image}`} // !! THIS CAUSES A GLITCH WHERE IT TRIES TO ACCESS IMAGES THAT DON'T EXIST
                            alt={`Image ${index + 1}`}
                            className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                          />
                          <h1 className="text-white text-[13px] font-bold ml-1 line-clamp-[1] pr-2">
                            {item.data && item.data.article_title}
                          </h1>
                          <div className="text-white text-[12px] overflow-y-auto max-h-[90px] m-1 mb-0 custom-scrollbar pr-3">
                            {item.data?.article_text
                              ? item.data.article_text
                                  .split("\n")
                                  .map((line, index) => {
                                    const bulletLine = line
                                      .replace(/\*/g, "")
                                      .replace(/^\d+\.\s*/, "• ");
                                    return <p key={index}>{bulletLine}</p>;
                                  })
                              : `${item.endpoint.name} failed to fetch.`}
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

        {/* Grouped Topics Section using user-selected topics */}
        {groupedData.map((group, index) => (
          <div key={index}>
            <div className="font-bold text-white mt-8">
              {group.topic.toUpperCase()}
            </div>
            <div className="h-[2px] w-full bg-[#ffffff7e]"></div>
            <section className="flex justify-center">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {loadingTopics ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <CarouselItem
                        key={idx}
                        className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="w-full py-4">
                          <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                            <CardContent className="flex-column h-full items-center justify-center p-1.5">
                              <Skeleton className="h-[50%] w-full mb-2 rounded-[10px]" />
                              <Skeleton className="h-[30px] w-full mb-1" />
                              <Skeleton className="h-[70px] w-full mb-2" />
                              <Skeleton className="h-[10px] w-20" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))
                  ) : group.articles && group.articles.length > 0 ? (
                    group.articles.map((article, idx) => (
                      <CarouselItem
                        key={idx}
                        className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="w-full py-4">
                          <Card className="h-[300px] bg-[#FFFFFF1A] border-none shadow-lg">
                            <CardContent className="flex-column h-full items-center justify-center p-1.5 pr-0">
                              <img
                                src={`../../home_images/${getSourceImage(
                                  article.article_link
                                )}`}
                                alt={getSourceImage(article.article_link)}
                                className="object-cover w-full h-[50%] rounded-[10px] mb-2"
                              />
                              <h1 className="text-white text-[13px] font-bold ml-1 line-clamp-[1] pr-2">
                                {article.article_title}
                              </h1>
                              <div className="text-white text-[12px] overflow-y-auto max-h-[90px] m-1 mb-0 custom-scrollbar pr-3">
                                {article.article_text
                                  .split("\n")
                                  .map((line, i) => {
                                    const bulletLine = line
                                      .replace(/\*/g, "")
                                      .replace(/^\d+\.\s*/, "• ");
                                    return <p key={i}>{bulletLine}</p>;
                                  })}
                              </div>
                              <a
                                href={article.article_link}
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
                    ))
                  ) : (
                    <p className="text-white">No articles found.</p>
                  )}
                </CarouselContent>
                <CarouselPrevious variant={"null"} />
                <CarouselNext variant={"null"} />
              </Carousel>
            </section>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
