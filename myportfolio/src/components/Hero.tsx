import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { FaFacebook, FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";
import aliImage from "@/assets/ali.jpg"; // Place your image in src/assets
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-background text-foreground py-10 px-4">
      {/* Left Side (Text + Socials) */}
      <motion.div
        className="col-span-12 md:col-span-8 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-semibold">
          I AM
          <span className="text-primary ml-2">Muhammad Ali Mirza</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2">
          <span className="text-2xl md:text-4xl font-semibold">I AM</span>
          <span className="text-2xl md:text-4xl text-primary underline decoration-dotted">
            <ReactTyped
              strings={[
                "Full stack developer",
                "MERN stack developer",
                "Web designer",
                "Web developer",
                "Freelancer",
                "Youtuber",
                "Blogger",
              ]}
              typeSpeed={80}
              backSpeed={50}
              loop
            />
          </span>
        </div>

        <Button
          size="lg"
          className="rounded-full text-black bg-primary hover:bg-primary/80"
        >
          Contact Me
        </Button>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-start space-x-4 pt-4">
          <FaFacebook size={36} className="text-primary hover:scale-110 transition" />
          <FaInstagram size={36} className="text-pink-500 hover:scale-110 transition" />
          <FaSquareXTwitter size={36} className="text-foreground hover:scale-110 transition" />
          <FaLinkedin size={36} className="text-primary hover:scale-110 transition" />
          <FaSquareYoutube size={36} className="text-red-600 hover:scale-110 transition" />
          <FaGithubSquare size={36} className="text-foreground hover:scale-110 transition" />
        </div>
      </motion.div>

      {/* Right Side (Image) */}
      <motion.div
        className="col-span-12 md:col-span-4 flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src={aliImage}
          alt="Muhammad Ali Mirza"
          className="object-cover rounded-full shadow-lg w-48 md:w-72 h-48 md:h-72"
        />
      </motion.div>
    </section>
  );
}
