
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-[#FEFBF6] dark:bg-gray-900 text-[#151515] dark:text-gray-100 py-16"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-4"
      >
        <h2 className="text-4xl font-bold underline decoration-dotted decoration-[#3498db] text-[#3498db]">
          Contact Us
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Feel free to reach out for collaborations, freelance projects, or just
          to say hi. I respond to emails within 24 hours.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Address */}
          <div className="flex items-start space-x-4 bg-[#95a5a6] dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg transition">
            <MapPin className="w-6 h-6 text-[#3498db]" />
            <div>
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                510-B Third Avenue, Baral Colony, Mangla Cantt
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 bg-[#95a5a6] dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg transition">
            <Phone className="w-6 h-6 text-[#3498db]" />
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                0317-0068650
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 bg-[#95a5a6] dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg transition">
            <Mail className="w-6 h-6 text-[#3498db]" />
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                muhammadalimirza90@gmail.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#95a5a6] dark:bg-gray-800 p-8 rounded-lg shadow space-y-6"
        >
          <h3 className="text-2xl font-bold text-[#3498db]">Send Message</h3>
          <form className="space-y-5">
            <div>
              <Input placeholder="Enter Full Name" required />
            </div>
            <div>
              <Input type="email" placeholder="Enter Email" required />
            </div>
            <div>
              <Textarea placeholder="Type your message" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white"
            >
              Submit
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Google Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-12 px-4 flex justify-center"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6681.578574236185!2d73.61773772541693!3d33.140899907035895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ff22425c61f85%3A0x6f0acc490ecadcad!2sMangla%20Cantt%2C%20Mangla%20Hamlet%2C%20Jhelum%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1622546790351!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default Contact;
