export default function AboutHero() {
    return (
        <section className="bg-brand-black text-white pt-32 pb-20 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                <p className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 animate-pulse">
                    Since 2021
                </p>
                <h1 className="text-5xl md:text-7xl font-black mb-6">
                    More Than Just <br />
                    <span className="text-gray-500">An Agency.</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                    We are a team of creators, strategists, and analysts dedicated to growing
                    businesses through honesty, grit, and data-driven creativity.
                </p>
            </div>
        </section>
    );
}