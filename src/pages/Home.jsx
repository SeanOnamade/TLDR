import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

function Home() {
  return (
    <div className="flex-col">
      <header className="text-center">
        <h1 className="mt-4 mb-8 text-4xl font-black">
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
              <h1 className="text-white text-4xl font-bold mb-4">Title</h1>
              <p className="text-white text-[16px] line-clamp-[10] mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                ac auctor nisl. In sed hendrerit metus. Proin malesuada quam id
                ultrices consectetur. Integer efficitur tristique posuere. Donec
                turpis tortor, consequat et porttitor quis, porttitor congue
                purus. Phasellus luctus malesuada fringilla. Nunc purus velit,
                gravida in leo vitae, facilisis commodo ante. Fusce sit amet
                tincidunt nulla, sit amet varius ipsum. Nulla sed magna et
                mauris gravida posuere ut nec neque. Sed consectetur vestibulum
                elementum. Morbi vitae hendrerit purus. In mollis elit tellus,
                non fringilla purus dictum convallis. Duis condimentum semper
                sapien, sed tempus justo aliquam eu. Donec semper gravida
                tempor. In fermentum lacinia purus, non consectetur quam mollis
                sed. Sed ullamcorper nisl sed purus pulvinar, eu rhoncus velit
                condimentum. Curabitur volutpat dolor et libero fringilla
                dapibus. Sed sed odio tortor. Suspendisse eleifend massa id
                mauris gravida finibus. Donec venenatis ullamcorper arcu eget
                ornare. Morbi fermentum molestie risus, a eleifend sapien
                dignissim at. Nulla feugiat libero eu ipsum pretium, sit amet
                tempus sem commodo. Ut imperdiet diam eu velit sodales, a
                volutpat turpis bibendum. Aliquam metus nunc, viverra varius
                cursus et, porttitor et justo. Nulla iaculis nibh non porttitor
                tempor.
              </p>
              <p className="text-[#F51555] text-[14px]">Read more {">"}</p>
            </div>
          </div>
        </section>
        <div className="font-bold text-white mt-12 -mb-2">TRENDING</div>
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
                        <p className="text-[#F51555] text-[12px] ml-1">
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
        <div className="font-bold text-white mt-8 -mb-2">RECENT</div>
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
                        <p className="text-[#F51555] text-[12px] ml-1">
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

