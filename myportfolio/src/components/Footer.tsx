import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareYoutube,
//   FaGithubSquare,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#95a5a6] text-[#151515] dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[#3498db]">
              Muhammad Ali Mirza
            </h2>
            <p className="mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left text-sm text-gray-700 dark:text-gray-400">
              Full Stack Developer (MERN & Next.js) with 3+ years of experience,
              delivering scalable, responsive, and high-performing web
              solutions.
            </p>

            {/* Social Links */}
            <div className="flex mt-6 space-x-4">
              <FaFacebook size={30} color="#3498db" className="hover:scale-110 transition-transform" />
              <FaInstagram size={30} color="#dd4b39" className="hover:scale-110 transition-transform" />
              <FaSquareXTwitter size={30} color="#1e1e1e" className="hover:scale-110 transition-transform" />
              <FaLinkedin size={30} color="#3498db" className="hover:scale-110 transition-transform" />
              <FaSquareYoutube size={30} color="#ff0000" className="hover:scale-110 transition-transform" />
              {/* <FaGithubSquare size={30} color="#1e1e1e" className="hover:scale-110 transition-transform" /> */}
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2"
          >
            {/* About */}
            <div>
              <p className="text-lg font-medium">About Me</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#3498db] transition">Portfolio</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">Experience</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">Testimonials</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">Career</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-lg font-medium">Services</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#3498db] transition">Web Development</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">API Integration</a></li>
                <li><a href="#" className="hover:text-[#3498db] transition">Cloud Deployment</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-lg font-medium">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>Email: <a href="mailto:muhammadalimirza90@gmail.com" className="text-[#3498db] hover:underline">muhammadalimirza90@gmail.com</a></li>
                <li>Phone: <span className="text-[#3498db]">+92 317 0068650</span></li>
                <li>Location: Mangla Cantt, Pakistan</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-12 border-t border-[#3498db] pt-6"
        >
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Muhammad Ali Mirza. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <a href="#" className="text-[#3498db] hover:text-[#2980b9] underline mx-2">Terms & Conditions</a>
              <a href="#" className="text-[#3498db] hover:text-[#2980b9] underline mx-2">Privacy Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
