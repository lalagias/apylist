import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-16">
      {/* Top announcement banner */}
      <div className="mb-8 bg-gradient-to-tl from-[#00c6ff] to-[#0072ff] text-white rounded-full px-4 py-2">
        <span>🚀 Live APY tracking across 100+ protocols</span>
      </div>

      {/* Main heading */}
      <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mb-6">
        Find the best crypto{" "}
        <span className="bg-gradient-to-tl from-[#00c6ff] to-[#0072ff] text-white px-2">
          yields
        </span>{" "}
        in seconds
      </h1>

      {/* Subheading */}
      <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8">
        Real-time APY tracking, yield comparisons, and smart alerts for DeFi
        protocols. Make informed decisions for your crypto investments.
      </p>

      {/* CTA Button */}
      <Button size="lg" id="pricing">
        Explore Top Yields
      </Button>

      {/* Social proof */}
      <div className="mt-12 flex flex-col items-center">
        <div className="flex -space-x-4 mb-3">
          {/* Add user avatars or protocol logos here */}
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div className="w-10 h-10 rounded-full bg-gray-500"></div>
        </div>
        <p className="text-gray-600">
          Tracking <span className="font-semibold">$500M+</span> in TVL across{" "}
          <span className="font-semibold">50+</span> protocols
        </p>
      </div>
    </div>
  );
}
