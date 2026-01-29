import { services } from "@/constants/constants";
import ServiceComp from "./ServiceComp";

const Services = () => {
  return (
    <div className=" antialiased text-[#151515] bg-[#FEFBF6]">
      <h2 className="text-center md:text-3xl mb-5 underline decoration-dotted decoration-[#3498db] text-2xl text-[#3498db] font-bold">
        Services
      </h2>
      <div
        className={`flex ${
          services.length > 1 ? "flex-wrap justify-center" : "justify-center ali"
        }`}
      >
        {services.map((service, index) => (
          <div key={index} className="lg:w-1/4 md:w-1/2 w-full p-2 mb-5">
            <ServiceComp
              title={service.title}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
