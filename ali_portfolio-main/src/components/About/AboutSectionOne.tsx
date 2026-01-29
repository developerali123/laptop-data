//@ts-nocheck
import Lottie from "lottie-web";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const AboutSectionOne = () => {
  const animationContainer = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    anim.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg", // Renders the animation as an SVG. You can also use 'canvas' for a Canvas render.
      loop: true,
      autoplay: true,
      // Here, include the path to your Lottie JSON file
      path: "Animations/Animation - 1712834381884.json",
    });
    anim.current.setSpeed(1);

    return () => anim.current?.destroy(); // Optional clean up for unmounting
  }, []);
  return (
    <div className="grid grid-cols-12 gap-6 px-4">
      <div className="md:col-span-6 col-span-12">
        <h3 className="my-1">
          I am{" "}
          <span className="text-[#3498db] text-lg font-bold">
            Muhammad ali mirza
          </span>
        </h3>
        <p className="my-1">
          Full-stack Software Developer and Javascript Enthusiast, Who Likes
          Building Things In Javascript. Please visit my channel for awesome
          stuff
        </p>
        <p className="my-1">
          <span className="text-[#3498db]">Date of birth: </span>
          <span>13 February 2012</span>
        </p>
        <p className="my-1">
          <span className="text-[#3498db]">Spoken Languages: </span>
          <span>English - Urdu</span>
        </p>
        <p className="my-1">
          <span className="text-[#3498db]">Nationality: </span>
          <span>Pakistan</span>
        </p>
        <p className="my-1">
          <span className="text-[#3498db]">Interest: </span>
          <span>Music - Reading - Travel</span>
        </p>

        <Link
          className="group relative inline-block overflow-hidden border border-[#3498db] px-8 py-3 focus:outline-none focus:ring my-1"
          href="Muhammad Ali Mirza_DLG.pdf"
          id="download"
          download=""
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-[#3498db] transition-all group-hover:w-full group-active:bg-[#3498db]"></span>
          <span className="relative text-sm font-medium text-[#3498db] transition-colors group-hover:text-[#151515]">
            Download CV
          </span>
        </Link>
      </div>
      <div className="md:col-span-6 col-span-12">
        <div ref={animationContainer} className="relative h-[300px]"></div>
      </div>
    </div>
  );
};

export default AboutSectionOne;
