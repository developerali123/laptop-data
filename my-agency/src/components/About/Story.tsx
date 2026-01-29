import Image from "next/image";

export default function Story() {
    return (
        <section className="py-20 bg-white text-brand-black">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: Image Grid */}
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                        {/* Note: In images ko public folder mein rakh lena */}
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10">
                            <Image src="/profile.jpg" alt="Our Story 1" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                            <Image src="/profile2.jpg" alt="Our Story 2" fill className="object-cover" />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl font-bold mb-6">
                            It started with a <span className="text-brand-orange">vision</span>.
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                We noticed a gap in the market. Too many agencies promised the world but delivered
                                vague reports and vanity metrics. We wanted to change that.
                            </p>
                            <p>
                                Our philosophy is simple: <strong>Honesty and Grit.</strong> We dont hide behind
                                fancy jargon. We roll up our sleeves, dig into the data, and build strategies
                                that actually impact your bottom line.
                            </p>
                            <p>
                                Today, we are proud to partner with ambitious brands who share our belief
                                that marketing should be transparent, structured, and profitable.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}