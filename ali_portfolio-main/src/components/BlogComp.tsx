import { Badge } from "antd";
import Image from "next/image";
import React from "react";

const BlogComp = () => {
  return (
    <div className="relative flex px-5 flex-col justify-center overflow-hidden bg-[#FEFBF6] text-[#151515] py-6 sm:py-12">
      <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">Blogs</h2>
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-4 col-span-12 shadow rounded-lg overflow-hidden bg-[#95a5a6]">
          <Badge.Ribbon
            text="Dec 22, 2023"
            color="#3498db"
            className="p-1 pr-3"
          >
            <Image
              src="https://loremflickr.com/320/240?random=1"
              className="object-cover h-52 w-full  hover:scale-105  transition-all"
              alt=""
              width={200}
              height={200}
            />
          </Badge.Ribbon>
          <div className="p-6">
            <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
              <a href="https://play.tailwindcss.com/TGny89rOkl?layout=horizontal">
                Finding best places to visit in California
              </a>
            </h3>
            <div className="flex mt-4 gap-4 items-center">
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                35
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-sky-400 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                20
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-lime-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                15
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#95a5a6] md:col-span-4 col-span-12 shadow rounded-lg overflow-hidden">
          <Badge.Ribbon
            text="Dec 22, 2023"
            color="#3498db"
            className="p-1 pr-3"
          >
            <Image
              src="https://loremflickr.com/320/240?random=1"
              className="object-cover h-52 w-full  hover:scale-105  transition-all"
              alt=""
              width={200}
              height={200}
            />
          </Badge.Ribbon>
          <div className="p-6">
            <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
              <a href="https://play.tailwindcss.com/TGny89rOkl?layout=horizontal">
                Finding best places to visit in California
              </a>
            </h3>
            <div className="flex mt-4 gap-4 items-center">
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                35
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-sky-400 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                20
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-lime-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                15
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#95a5a6] md:col-span-4 col-span-12 shadow rounded-lg overflow-hidden">
          <Badge.Ribbon
            text="Dec 22, 2023"
            color="#3498db"
            className="p-1 pr-3"
          >
            <Image
              src="https://loremflickr.com/320/240?random=1"
              className="object-cover h-52 w-full  hover:scale-105  transition-all"
              alt=""
              width={200}
              height={200}
            />
          </Badge.Ribbon>
          <div className="p-6">
            <h3 className="mt-3 font-bold text-lg pb-4 border-b">
              <a href="https://play.tailwindcss.com/TGny89rOkl?layout=horizontal">
                Finding best places to visit in California
              </a>
            </h3>
            <div className="flex mt-4 gap-4 items-center">
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                35
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-sky-400 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                20
              </span>
              <span className="flex gap-1 items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-lime-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                15
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComp;
