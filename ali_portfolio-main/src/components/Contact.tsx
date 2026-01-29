import Head from "next/head";
import { FaAddressBook, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contactBox" className="bg-[#FEFBF6] text-[#151515]">
      <div>
        <div>
          <div>
            <div className="heading">
              <div className="img">
              <h2 className="text-center md:text-3xl text-2xl mb-5 underline decoration-dotted decoration-[#3498db] text-[#3498db] font-bold">Contact Us</h2>
              </div>
              <p className="text-center m-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                ab tenetur labore sit! Eos sequi facere hic vero, nulla pariatur
                doloribus a debitis numquam laudantium porro amet aliquam cumque
                itaque. Minus, amet nulla tenetur quis eaque provident!
                Aspernatur dicta nemo dolor in distinctio illo obcaecati
                repellendus magni, consectetur reprehenderit pariatur.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="contactinfo md:col-span-6 col-span-12">
              <div className="box">
                <div className="icon">
                  <FaAddressBook />
                </div>
                <div className="text1">
                  <h3>Address</h3>
                  <address>
                    510-b third Avenue baral colony
                    <br />
                    mangla cantt
                  </address>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <FaPhone />
                </div>
                <div className="text1">
                  <h3>phone number</h3>
                  <address>03170068650</address>
                </div>
              </div>
              <div className="box">
                <div className="icon">
                  <FaEnvelope />
                </div>
                <div className="text1">
                  <h3>Email</h3>
                  <address>muhammadalimirza90@gmail.com</address>
                </div>
              </div>
            </div>
            <div className="contactform md:col-span-6 col-span-12">
            <h2 className="md:text-3xl text-2xl mb-5 font-bold text-[#3498db]">Send Message</h2>
              <form action="">
                <div className="inputbox">
                  <input type="text" name="" id="" required />
                  <span>Enter full name</span>
                </div>
                <div className="inputbox">
                  <input type="email" name="" id="" required />
                  <span>Enter Email</span>
                </div>
                <div className="inputbox">
                  <textarea name="" id="" required></textarea>
                  <span>Type your message</span>
                </div>
                <div className="inputbox">
                  <input type="submit" value="submit" name="" id="" />
                </div>
              </form>
            </div>
            <div className="map col-span-12 flex justify-center items-center px-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6681.578574236185!2d73.61773772541693!3d33.140899907035895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ff22425c61f85%3A0x6f0acc490ecadcad!2sMangla%20Cantt%2C%20Mangla%20Hamlet%2C%20Jhelum%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1622546790351!5m2!1sen!2s"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
