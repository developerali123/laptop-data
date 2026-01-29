import React from 'react';

const CallToAction = () => {
    return (
        <section className="bg-background py-16 md:py-24 px-4 transition-colors duration-300">

            {/* Main Container - Ab yeh ek 'Card' ki tarah dikhega taaki space kam lage */}
            <div className="relative max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl">

                {/* Background Glow/Gradient inside the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none opacity-50" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 md:py-20 space-y-8">

                    {/* Text Section */}
                    <div className="space-y-4 max-w-3xl">
                        <h2 className="text-foreground text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                            Get a better vue
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                            Join thousands of investors making smarter decisions. Start your free trial today.
                        </p>
                    </div>

                    {/* Button - Thoda compact kiya hai */}
                    <button className="group relative bg-foreground text-background font-bold px-10 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                        {/* Gradient Text Effect on Hover (Optional aesthetic touch) */}
                        <span className="relative z-10">Sign Up Today</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </button>

                </div>
            </div>

        </section>
    );
};

export default CallToAction;