import Image from "next/image";

const team = [
    { name: "Elin Smith", role: "Marketing specialist/CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
    { name: "Zarafat Hussain", role: "Developer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" },
    { name: "Bianca Salming", role: "Athlete/Content creator", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
];

export default function Team() {
    return (
        <section className="py-24 bg-white text-black">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <p className="text-[#D9FD50] font-bold mb-2 uppercase tracking-wider">About us</p>
                        <h2 className="text-5xl font-bold">Our Team</h2>
                    </div>
                    <p className="text-gray-500 max-w-lg leading-relaxed text-sm">
                        Elin is the CEO and an experienced operative marketing executive, with her unique drive, work ethic and strong network of creators.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {team.map((member, index) => (
                        <div key={index} className="text-center group">
                            <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-gray-100">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}