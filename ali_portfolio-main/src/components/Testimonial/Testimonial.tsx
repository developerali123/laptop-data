import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { useEffect, useRef, useState } from "react";
import TestimonialComp from "./TestimonialComp";
import { testinominal } from "@/constants/constants";

const Testimonial = () => {
  const [slider, setSlider] = useState<KeenSliderInstance | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderContainerRef.current && !slider) {
      const newSlider = new KeenSlider(sliderContainerRef.current, {
        loop: true,
        slides: {
          origin: "center",
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 1.5,
              spacing: 32,
            },
          },
        },
      });

      setSlider(newSlider);
    }

    // Cleanup on unmount
    return () => {
      if (slider) {
        slider.destroy();
      }
    };
  }, [slider]);
  return (
    <main className=" p-4 text-[#151515] bg-[#FEFBF6]">
      <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Testinominals
      </h2>
      <section className="bg-[#95a5a6] mb-10 antialiased">
        <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
                Dont just take our word for it...
              </h2>

              <p className="mt-4 ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptas veritatis illo placeat harum porro optio fugit a culpa
                sunt id!
              </p>

              <div className="hidden lg:mt-8 justify-center lg:flex lg:gap-4">
                <button
                  onClick={() => slider?.prev()}
                  aria-label="Previous slide"
                  id="keen-slider-previous-desktop"
                  className="rounded-full border border-[#3498db] p-3 text-[#3498db] transition hover:bg-[#3498db] hover:text-[#151515]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => slider?.next()}
                  aria-label="Next slide"
                  id="keen-slider-next-desktop"
                  className="rounded-full border border-[#3498db] p-3 text-[#3498db] transition hover:bg-[#3498db] hover:text-[#151515]"
                >
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="-mx-6 lg:col-span-2 lg:mx-0">
              <div
                id="keen-slider"
                className="keen-slider"
                ref={sliderContainerRef}
              >
                {testinominal.map((testinominal, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <TestimonialComp
                      title={testinominal.title}
                      description={testinominal.description}
                      author={testinominal.author}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4 lg:hidden">
            <button
              onClick={() => slider?.prev()}
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-[#3498db] p-3 text-[#3498db] transition hover:bg-[#3498db] hover:text-[#151515]"
            >
              <svg
                className="h-5 w-5 -rotate-180 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button
              onClick={() => slider?.next()}
              aria-label="Next slide"
              id="keen-slider-next"
              className="rounded-full border border-[#3498db] p-3 text-[#3498db] transition hover:bg-[#3498db] hover:text-[#151515]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonial;
