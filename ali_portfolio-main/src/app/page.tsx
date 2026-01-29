"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import About from "@/components/About/About";
import BlogComp from "@/components/BlogComp";
import Certificate from "@/components/Certificate";
import Contact from "@/components/Contact";
import FaqComp from "@/components/FaqComp";
import FooterComp from "@/components/FooterComp";
import HeaderComp from "@/components/HeaderComp";
import HeroComp from "@/components/HeroComp";
import Price from "@/components/Price/Price";
import Projects from "@/components/Projects";
import Services from "@/components/Services/Services";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import Testimonial from "@/components/Testimonial/Testimonial";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen bg-[#FEFBF6]">
          <Loader />
        </div>
      ) : (
        <>
          <HeaderComp />
          <HeroComp />
          <About />
          <Services />
          <Stats />
          <Skills />
          <Certificate />
          <Projects />
          <Testimonial />
          <Price />
          <BlogComp />
          <Contact />
          <FaqComp />
          <FooterComp />
        </>
      )}
    </>
  );
}
