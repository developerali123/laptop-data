import { Props } from "@/types/interfaces";
import Link from "next/link";
import React from "react";

const ServiceComp: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="max-w-sm p-6 bg-[#95a5a6] border border-[#3498db] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 h-full" data-aos="flip-left">
      <Link href="#">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-[#3498db]">
          {title}
        </h5>
      </Link>
      <p className="mb-3">
        {description}
      </p>
      <Link
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#3498db] rounded-md  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default ServiceComp;
