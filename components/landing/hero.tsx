import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <div className="flex -space-x-2 mb-3">
          <Avatar className="border-2 border-border bg-background">
            <AvatarImage
              src="/assets/logos/bitcoin-btc-logo.png"
              alt="Bitcoin logo"
            />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-border bg-background">
            <AvatarImage
              src="/assets/logos/ethereum-eth-logo.png"
              alt="Ethereum logo"
            />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-border bg-background">
            <AvatarImage
              src="/assets/logos/solana-sol-logo.png"
              alt="Solana icon"
            />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-gray-600">
          Tracking <span className="font-semibold">$500M+</span> in TVL across{" "}
          <span className="font-semibold">50+</span> protocols
        </p>
      </div>
    </div>
  );
}
