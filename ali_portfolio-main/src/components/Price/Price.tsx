import React from "react";
import PriceComp from "./PriceComp";

const Price = () => {
  return (
    <section className="py-3 antialiased text-[#151515] bg-[#FEFBF6]">
      <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PriceComp
            title="Basic"
            description="Best option for personal use & for your next project."
            price={29}
            details={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Basic support",
              "Free updates: 3 months"
            ]}
          />
          <PriceComp
            title="Standard"
            description="Relevant for small businesses and startups."
            price={99}
            details={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Standard support",
              "Free updates: 6 months"
            ]}
          />
          <PriceComp
            title="Premium"
            description="Best for large scale uses and extended support."
            price={199}
            details={[
              "Individual configuration",
              "No setup, or hidden fees",
              "Premium support",
              "Free updates: 1 year"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Price;
