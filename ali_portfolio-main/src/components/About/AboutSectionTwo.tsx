//@ts-nocheck
import Lottie from "lottie-web";
import React, { useEffect, useRef } from "react";

// Reusable ListItem component
const ListItem = ({ date, title, institution }) => (
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
          {date}
        </p>
        <p className="font-medium text-blue-500 hover:text-blue-700 focus:text-blue-800 duration-300 transition ease-in-out text-sm">
          {title}
        </p>
        <p className=" mb-6">{institution}</p>
      </div>
    </div>
  </li>
);

const AboutSectionTwo = () => {
  const animationContainer = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    anim.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg", // Renders the animation as an SVG. You can also use 'canvas' for a Canvas render.
      loop: true,
      autoplay: true,
      // Here, include the path to your Lottie JSON file
      path: "Animations/Animation - 1712922589360.json",
    });
    anim.current.setSpeed(1);

    return () => anim.current?.destroy(); // Optional clean up for unmounting
  }, []);
  return (
    <>
      <h2 className="text-center md:text-3xl text-2xl mb-5 text-[#3498db] font-bold underline decoration-dotted decoration-[#3498db]">
        Education
      </h2>
      <div className="grid grid-cols-12 gap-6 px-4">
        <div className="md:col-span-6 col-span-12">
          <div ref={animationContainer} className="relative h-[500px]"></div>
        </div>
        <div className="px-4 md:col-span-6 col-span-12">
          <ol>
          <ListItem
              date="2015-2017"
              title="matric"
              institution="Army public school mangla cantt"
            />
            <ListItem
              date="2017-2019"
              title="intermediate"
              institution="Fg inter college mangla cantt"
            />
            <ListItem
              date="2020-present"
              title="Bachelor of computer science"
              institution="PMAS Arid Agriculture University Rawalpindi"
            />
          </ol>
        </div>
      </div>
    </>
  );
};

export default AboutSectionTwo;
