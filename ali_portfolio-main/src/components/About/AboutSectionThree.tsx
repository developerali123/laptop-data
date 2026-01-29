//@ts-nocheck
import Lottie from "lottie-web";
import React, { useEffect, useRef } from "react";

const ExperienceItem = ({ dateRange, position, company }) => {
  return (
    <li className="border-l-2 border-blue-500">
      <div className="md:flex flex-start">
        <div className="bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            className="text-white w-3 h-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
            ></path>
          </svg>
        </div>
        <div className="block p-6 rounded-lg shadow-lg bg-[#95a5a6] w-full ml-6 mb-10">
          <p className="font-medium text-blue-500 hover:text-blue-700 focus:text-blue-800 duration-300 transition ease-in-out text-sm">
            {dateRange}
          </p>
          <p className=" mb-6">
            {position} in {company}
          </p>
        </div>
      </div>
    </li>
  );
};

const AboutSectionThree = () => {
  const animationContainer = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    anim.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg", // Renders the animation as an SVG. You can also use 'canvas' for a Canvas render.
      loop: true,
      autoplay: true,
      // Here, include the path to your Lottie JSON file
      path: "Animations/Animation - 1712923206507.json",
    });
    anim.current.setSpeed(1);

    return () => anim.current?.destroy(); // Optional clean up for unmounting
  }, []);
  return (
    <>
      <h2 className="text-center mb-5 md:text-3xl text-2xl text-[#3498db] font-bold underline decoration-dotted decoration-[#3498db]">
        Experience
      </h2>
      <div className="grid grid-cols-12 gap-6 px-4">
        <div className="px-4 md:col-span-6 col-span-12 md:order-1 order-2">
          <ol>
            <ExperienceItem
              dateRange="January 2023-June 2023"
              position="Mern Stack Developer"
              company="Secure Startup"
            />
            <ExperienceItem
              dateRange="October 2022-December 2022"
              position="Web Developer"
              company="LetsGrowMore"
            />
            <ExperienceItem
              dateRange="July 2022-September 2022"
              position="Web Developer"
              company="Oasis Infobytes"
            />
            <ExperienceItem
              dateRange="October 2023-January 2024"
              position="Mern Stack Developer"
              company="Crown Intl Technology"
            />
            <ExperienceItem
              dateRange="Feburary 2024-present"
              position="Mern Stack Developer"
              company="TMRC Consultant"
            />
          </ol>
        </div>
        <div className="md:col-span-6 col-span-12 md:order-2 order-1">
          <div ref={animationContainer} className="relative h-[500px]"></div>
        </div>
      </div>
    </>
  );
};

export default AboutSectionThree;
