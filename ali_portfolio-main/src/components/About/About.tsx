import AboutSectionOne from "./AboutSectionOne";
import AboutSectionThree from "./AboutSectionThree";
import AboutSectionTwo from "./AboutSectionTwo";

const About = () => {
  return (
    <div className="text-[#151515] bg-[#FEFBF6]">
      <h2 className="text-center mb-5 md:text-3xl text-2xl text-[#3498db] font-bold underline decoration-dotted decoration-[#3498db]">
        About me
      </h2>
      <AboutSectionOne />
      <AboutSectionTwo />
      <AboutSectionThree />
    </div>
  );
};

export default About;
