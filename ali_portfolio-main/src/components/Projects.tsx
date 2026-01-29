//@ts-nocheck
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { projects, settings } from "@/constants/constants";

const Projects = () => {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-[#FEFBF6] text-[#151515] py-6 sm:py-12">
      <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">
        Projects
      </h2>
      <div>
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div key={index} className="slide-item">
              <div className="col-span-4 shadow rounded-lg overflow-hidden bg-[#95a5a6] mx-3">
                <div className="projects">
                  <Image
                    src={project.image}
                    className="object-cover h-52 w-full  hover:scale-105  transition-all"
                    alt=""
                    width={200}
                    height={200}
                  />
                  <div className="content">
                    <a href={project.demoLink}>Demo</a>
                    <a href={project.sourceCodeLink}>source code</a>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                    {project.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
          {/* Repeat the above structure for other slides */}
        </Slider>
      </div>
    </div>
  );
};

export default Projects;
