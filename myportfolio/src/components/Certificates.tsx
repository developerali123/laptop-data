import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const certificateImages = [
  "/images/html-1.jpg",
  "/images/html.jpeg",
  "/images/css-1.jpg",
  "/images/css.jpeg",
  "/images/javascript.jpg",
  "/images/react.jpg",
  "/images/node.jpg",
];

export default function Certificates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-background text-foreground py-12">
      <motion.h2
        className="text-center md:text-3xl text-2xl mb-8 font-bold underline decoration-dotted text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Certificates
      </motion.h2>

      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {certificateImages.map((src, index) => (
                <div
                  key={index}
                  className="flex-[0_0_80%] md:flex-[0_0_60%] p-4 flex justify-center"
                >
                  <Card className="w-full bg-muted shadow-md border border-primary hover:scale-105 transition-transform duration-300">
                    <CardContent className="flex justify-center items-center relative h-[300px] md:h-[400px]">
                      <img
                        src={src}
                        alt={`Certificate ${index + 1}`}
                        className="object-contain rounded-md max-h-full max-w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={scrollPrev}>
              Prev
            </Button>
            <Button variant="outline" size="sm" onClick={scrollNext}>
              Next
            </Button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {certificateImages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  selectedIndex === index ? "bg-primary" : "bg-muted-foreground"
                }`}
                animate={{
                  scale: selectedIndex === index ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
