//@ts-nocheck
import { FaqItem, faqs } from "@/constants/constants";
import React from "react";

const FaqComp = () => {
  

  return (
    <div className="max-w-screen-xl mx-auto px-5 text-[#151515] bg-[#FEFBF6]">
      <div className="flex flex-col items-center pt-5">
        <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
          FAQ
        </h2>
        <p className=" text-xl mt-3">Frequently asked questions</p>
      </div>
      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FaqComp;
