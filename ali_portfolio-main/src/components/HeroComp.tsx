import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaGithubSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";
import { ReactTyped } from "react-typed";

const HeroComp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FEFBF6] text-[#151515] py-10">
      <div className="col-span-12 md:col-span-8 md:order-1 order-2">
        <div className="flex flex-col justify-center items-center m-5">
          <h1
            data-aos="fade-up-right"
            className="text-2xl md:text-5xl font-semibold mb-5"
          >
            I AM
            <span className="text-[#3498db]"> Muhammad Ali Mirza</span>
          </h1>
          <div className="flex items-center">
            <h1 className="font-semibold mb-5 text-center md:text-left">
              <span className="text-2xl md:text-4xl mr-3">I AM</span>
              <span className="text-2xl md:text-4xl text-[#3498db] underline decoration-dotted decoration-[#3498db]">
                <ReactTyped
                  strings={[
                    "Full stack developer",
                    "MERN stack developer",
                    "web designer",
                    "web developer",
                    "freelancer",
                    "youtuber",
                    "blogger",
                  ]}
                  typeSpeed={100}
                  loop
                />
              </span>
            </h1>
          </div>
          <button
            type="button"
            className="text-white bg-[#3498db] hover:bg-[#2980b9] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 md:mb-0"
          >
            Contact Me
          </button>
        </div>
        <div className="social-networks flex justify-center mt-4">
          <ul className="flex flex-wrap">
            <li>
              <FaFacebook size={40} color="#3498db" className="mr-3" />
            </li>
            <li>
              <FaInstagram size={40} color="#dd4b39" className="mr-3" />
            </li>
            <li>
              <FaSquareXTwitter size={40} color="#211f1f" className="mr-3" />
            </li>
            <li>
              <FaLinkedin size={40} color="#3498db" className="mr-3" />
            </li>
            <li>
              <FaSquareYoutube size={40} color="#ff0000" className="mr-3" />
            </li>
            <li>
              <FaGithubSquare size={40} color="#211f1f" className="mr-3" />
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 flex justify-center md:order-2 order-1">
        <Image
          src="/images/ali.jpg"
          alt=""
          className="object-cover rounded-full shadow-lg w-48 md:w-72 h-48 md:h-72"
          id="ali"
          data-aos="slide-down"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default HeroComp;
