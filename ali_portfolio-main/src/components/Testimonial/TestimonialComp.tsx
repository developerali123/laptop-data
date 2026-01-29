import { Props } from "@/types/interfaces";
import React from "react";
import { FaStar } from "react-icons/fa6";

const TestimonialComp: React.FC<Props> = ({ title, description, author }) => {
  return (
    <blockquote className="flex h-full flex-col justify-between bg-[#FEFBF6] p-6 shadow-sm sm:p-8 lg:p-12">
      <div>
        <div className="flex space-x-2 mx-2">
          <div className="flex  items-center  space-x-1">
            <FaStar className="text-[#3498db]" size={13} />
            <FaStar className="text-[#3498db]" size={13} />
            <FaStar className="text-[#3498db]" size={13} />
            <FaStar className="text-[#3498db]" size={13} />
            <FaStar className="text-[#3498db]" size={13} />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-[#3498db] sm:text-3xl">
            {title}
          </p>

          <p className="mt-4 leading-relaxed ">{description}</p>
        </div>
      </div>

      <footer className="mt-4 text-sm font-medium  sm:mt-6">
        &mdash; {author}
      </footer>
    </blockquote>
  );
};

export default TestimonialComp;
