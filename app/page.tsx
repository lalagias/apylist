import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filters } from "@/components/directory/filters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ItemsDisplay } from "@/components/directory/items-display";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import FAQ from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Pricing from "@/components/landing/pricing";

interface Pool {
  symbol: string;
  project: string;
  chain: string;
  stablecoin: boolean;
  apy: number;
  tvlUsd: number;
  ilRisk: string;
  exposure: string;
  apyPct1D: number;
  apyPct7D: number;
  apyPct30D: number;
  predictions: {
    predictedClass: string;
    predictedProbability: number;
    binnedConfidence: number;
  };
  apyMean30d: number;
  volumeUsd7d: number;
}

async function getDefiRates() {
  try {
    const res = await fetch("https://yields.llama.fi/pools", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();

    const limitedData = data.data;
    console.log("limitedData", limitedData[1]);

    const transformedData = limitedData.map((pool: Pool, index: number) => ({
      id: index + 1,
      name: `${pool.symbol} Yield`,
      provider: `${pool.project} (${pool.chain})`,
      type: pool.stablecoin ? "stablecoin" : "crypto",
      apy: Number((pool.apy * 100).toFixed(2)),
      risk: getRiskLevel(pool.ilRisk, pool.exposure),
      minDeposit: 0,
      tvlUsd: pool.tvlUsd,
      project: pool.project,
      chain: pool.chain,
      symbol: pool.symbol,
      apyPct1D: pool.apyPct1D,
      apyPct7D: pool.apyPct7D,
      apyPct30D: pool.apyPct30D,
      stablecoin: pool.stablecoin,
      ilRisk: pool.ilRisk,
      exposure: pool.exposure,
      predictions: pool.predictions,
      apyMean30d: pool.apyMean30d,
      volumeUsd7d: pool.volumeUsd7d,
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching DeFi rates:", error);
    return [];
  }
}

// Helper function to determine risk level
function getRiskLevel(ilRisk: string, exposure: string): string {
  if (ilRisk === "no" && exposure === "single") return "low";
  if (ilRisk === "yes" && exposure === "single") return "medium";
  if (exposure === "multi") return "high";
  return "very high";
}

interface FilteredItem {
  type: string;
  apy: number;
  risk: string;
  minDeposit: number;
  name: string;
  provider: string;
  tvlUsd: number;
  chain: string;
  id: number;
  project: string;
}

async function getAllRates() {
  try {
    const defiRates = await getDefiRates();
    return defiRates;
  } catch (error) {
    console.error("Error in getAllRates:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search?: string;
    minApy?: string;
    maxApy?: string;
    minTvl?: string;
    maxTvl?: string;
    risk?: string[];
    attributes?: string[];
    categories?: string[];
    sortBy?: string;
    sortOrder?: string;
    chains?: string[];
    page?: string;
  };
}) {
  const allRatesData = await getAllRates();

  // Extract and parse search params with defaults
  const search = searchParams.search?.toLowerCase() || "";
  const minApy = Number(searchParams.minApy || 0);
  const maxApy = Number(searchParams.maxApy || 15);
  const minTvl = Number(searchParams.minTvl || 0);
  const maxTvl = Number(searchParams.maxTvl || 0);
  const riskLevels = searchParams.risk || ["low", "medium", "high", "very high"];
  // const _attributes = searchParams.attributes || [];
  // const _categories = searchParams.categories || [];
  const chains = searchParams.chains || [];
  const sortBy = searchParams.sortBy || "apy";
  const sortOrder = searchParams.sortOrder || "desc";

  const filteredAndSortedData = allRatesData
    .filter((item: FilteredItem) => {
      const matchesSearch = search
        ? item.name.toLowerCase().includes(search) ||
          item.provider.toLowerCase().includes(search)
        : true;

      const matchesApy = item.apy >= minApy && 
        (maxApy === 0 || item.apy <= maxApy);

      const matchesTvl = item.tvlUsd >= minTvl && 
        (maxTvl === 0 || item.tvlUsd <= maxTvl);

      const matchesRisk = riskLevels.length === 0 || 
        riskLevels.includes(item.risk);

      const matchesChain = chains.length === 0 || 
        chains.includes(item.chain);

      return (
        matchesSearch &&
        matchesApy &&
        matchesTvl &&
        matchesRisk &&
        matchesChain
      );
    })
    .sort((a: FilteredItem, b: FilteredItem) => {
      const order = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "apy":
          return (a.apy - b.apy) * order;
        case "tvl":
          return (a.tvlUsd - b.tvlUsd) * order;
        default:
          return a.name.localeCompare(b.name) * order;
      }
    });

  const itemsPerPage = 21;
  const currentPage = Number(searchParams.page) || 1;
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      <Header />
      <main className="relative">
        <Hero />

        <div className="flex justify-between items-center mb-4">
          <Filters data={filteredAndSortedData} />
        </div>

        <ItemsDisplay items={currentItems} />

        <div className="mt-8 mb-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 ? (
                  <PaginationPrevious href={`?page=${currentPage - 1}`} />
                ) : (
                  <PaginationPrevious
                    href={`?page=1`}
                    className="pointer-events-none opacity-50"
                  />
                )}
              </PaginationItem>

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink href={`?page=1`}>1</PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {[...Array(3)].map((_, i) => {
                const pageNumber = currentPage - 1 + i;
                if (pageNumber <= 0 || pageNumber > totalPages) return null;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`?page=${pageNumber}`}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink href={`?page=${totalPages}`}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                {currentPage < totalPages ? (
                  <PaginationNext href={`?page=${currentPage + 1}`} />
                ) : (
                  <PaginationNext
                    href={`?page=${totalPages}`}
                    className="pointer-events-none opacity-50"
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {currentItems.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No results found. Try adjusting your filters.
          </p>
        )}

        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold">How APY List Works</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>AI-Powered APY Search</CardTitle>
              </CardHeader>
              <CardContent>
                With APY List, our AI scour the web in real time to find the top
                Annual Percentage Yields from trusted financial platforms. We
                continuously update our database, so you get the most accurate
                and up-to-date information, without spending hours searching
                manually.
              </CardContent>
            </Card>

            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Personalized Filtering</CardTitle>
              </CardHeader>
              <CardContent>
                Our intelligent filtering system allows you to customize your
                search based on your preferences—whether you’re looking for
                specific platforms, terms, or account types (such as crypto or
                savings). The AI ensures you only see the results that truly
                matter to you.
              </CardContent>
            </Card>

            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Get Real-Time Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                Stay ahead of the game with AI-driven notifications. Once you
                set your preferences, we&apos;ll notify you whenever top APY
                offers that match your criteria become available, helping you
                maximize your returns effortlessly.
              </CardContent>
            </Card>
          </div>
        </section>

        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
