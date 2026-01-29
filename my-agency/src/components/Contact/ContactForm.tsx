import Link from "next/link";

export default function ContactForm() {
    return (
        <section className="pb-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* LEFT SIDE: Contact Info */}
                    <div className="w-full lg:w-1/3">
                        <h3 className="text-2xl font-bold text-brand-black mb-8">Contact Information</h3>

                        <div className="space-y-8">

                            {/* Email */}
                            <div className="group flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-full text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Email Us</p>
                                    <a href="mailto:elin@itterate.se" className="text-lg font-medium text-gray-900 hover:text-brand-orange transition-colors">
                                        elin@itterate.se
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="group flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-full text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Visit Us</p>
                                    <p className="text-lg font-medium text-gray-900 leading-snug">
                                        Stjärnvägen 15 <br /> 135 55 Tyresö
                                    </p>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Follow Us</p>
                                <div className="flex gap-4">
                                    {/* LinkedIn */}
                                    <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </Link>
                                    {/* Instagram */}
                                    <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE: The Form */}
                    <div className="w-full lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <form className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-white px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-white px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Subject</label>
                                <select className="w-full bg-white px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all text-gray-700">
                                    <option>General Inquiry</option>
                                    <option>Marketing Strategy</option>
                                    <option>Paid Advertising</option>
                                    <option>Social Media Growth</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Message</label>
                                <textarea rows={5} placeholder="Tell us about your project..." className="w-full bg-white px-6 py-4 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-brand-orange text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-200 hover:-translate-y-1">
                                Send Message
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}