import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            // 👩🏼 Blonde Woman (Fanny)
            image: "/Fanny-Dolff-Itterate-reviews.jpeg",
            quote: "The best decision we made was partnering with Itterate. Our online presence has completely transformed, and the results speak for themselves. Highly recommended!",
            name: "Fanny Dolff",
            role: "Entrepreneur & Founder",
            rating: 5
        },
        {
            id: 2,
            // 👨🏻 Bald Man with Beard (Axel)
            image: "/Axel-Samuelson-Itterate-Reviews.jpeg",
            quote: "Itterate's strategic approach to our marketing was a game-changer. They didn't just run ads; they built a system that consistently brings us qualified leads.",
            name: "Axel Samuelson",
            role: "Head of Growth, TechStart",
            rating: 5
        },
        {
            id: 3,
            // 👨🏼 Man with Shirt (Alex)
            image: "/Alex-Aberg-Itterate-reviews.jpeg",
            quote: "Their team is incredibly knowledgeable and responsive. They helped us find our brand voice and connect with our audience in a way we never thought possible.",
            name: "Alex Åberg",
            role: "Creative Director",
            rating: 4
        }
    ];

    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white skew-x-12 opacity-50 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <p className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 animate-pulse">
                        Client Stories
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-black mb-6">
                        What Our Clients Say
                    </h2>
                    <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">

                            {/* Quote Icon (Background) */}
                            <div className="absolute top-6 right-8 text-gray-100 group-hover:text-brand-orange/10 transition-colors duration-500 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Profile Image */}
                            <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                                <Image
                                    src={testimonial.image} // 
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Quote Text */}
                            <p className="text-gray-600 text-lg leading-relaxed text-center italic mb-8 flex-grow relative z-10">
                                `{testimonial.quote}`
                            </p>

                            {/* Author Info & Rating */}
                            <div className="text-center mt-auto">
                                <h4 className="text-xl font-bold text-brand-black mb-1 group-hover:text-brand-orange transition-colors">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm text-gray-500 font-medium mb-3">
                                    {testimonial.role}
                                </p>

                                {/* Star Rating */}
                                <div className="flex items-center justify-center gap-1 text-brand-orange">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < testimonial.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




// import Image from "next/image";

// export default function Testimonials() {
//     const reviews = [
//         { id: 1, name: "Fanny Dolff", role: "Entrepreneur", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80", content: "Elin is a warm soul who listens. Creativity comes naturally to her. Clarity is a mantra that defines working with Elin. I would gladly work with her again!" },
//         { id: 2, name: "Alex Åberg", role: "Head Copywriter", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80", content: "Elin has an exceptional sense of service and teamwork. She always strives to do her best and goes above and beyond. Elin radiates energy and gets things done." },
//         { id: 3, name: "Axel Samuelson", role: "Head of Growth", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80", content: "Few people are equally driven and understand how to take new steps in a project. One of the most genuine and easy-going people I have ever worked with." }
//     ];

//     return (
//         // Changed: py-32 -> py-20
//         <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
//             {/* Glow reduced */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-100/30 rounded-full blur-[80px] -z-10"></div>

//             <div className="container mx-auto px-6 md:px-12">
//                 {/* Header Compact */}
//                 <div className="text-center max-w-2xl mx-auto mb-12">
//                     <p className="text-lime-500 font-bold text-xs uppercase tracking-widest mb-2">Customer Reviews</p>
//                     <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">Testimonials</h2>
//                 </div>

//                 {/* Grid Compact */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {reviews.map((review) => (
//                         <div key={review.id} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100">
//                                     <Image src={review.image} alt={review.name} fill className="object-cover" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-base text-gray-900">{review.name}</h4>
//                                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{review.role}</p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-600 leading-relaxed text-sm italic mb-4">`{review.content}`</p>
//                             <div className="flex gap-1 text-lime-500">
//                                 {[...Array(5)].map((_, i) => (
//                                     <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }