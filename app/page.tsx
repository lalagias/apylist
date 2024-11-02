import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MountainIcon } from "lucide-react";
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
import { LayoutGrid, List } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const faqs = [
  {
    question: "What is APY?",
    answer:
      "APY stands for Annual Percentage Yield. It's the real rate of return earned on a savings deposit or investment taking into account the effect of compounding interest.",
  },
  {
    question: "How does APY List find the best rates?",
    answer:
      "Our AI-powered system continuously scans trusted financial platforms and institutions to find and update the most competitive APY rates in real-time.",
  },
  {
    question: "Is APY List free to use?",
    answer:
      "Yes, our basic service is free. We also offer premium features for users who want more advanced filtering and alert options.",
  },
  {
    question: "How often are the APY rates updated?",
    answer:
      "Our system updates rates in real-time as soon as new information becomes available from our sources.",
  },
];

interface Pool {
  symbol: string;
  project: string;
  chain: string;
  stablecoin: boolean;
  apy: number;
  tvlUsd: number;
  ilRisk: string;
  exposure: string;
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

    const limitedData = data.data.slice(0, 100);
    console.log(limitedData);

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
    type?: string;
    minApy?: string;
    maxApy?: string;
    minDeposit?: string;
    risk?: string[];
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    view?: string;
  };
}) {
  const allRatesData = await getAllRates();

  const type = searchParams.type || "all";
  const minApy = Number(searchParams.minApy || 0);
  const maxApy = Number(searchParams.maxApy || 15);
  const minDeposit = Number(searchParams.minDeposit || 0);
  const riskLevels = searchParams.risk || [
    "low",
    "medium",
    "high",
    "very high",
  ];
  const sortBy = searchParams.sortBy || "apy";
  const sortOrder = searchParams.sortOrder || "desc";

  const filteredAndSortedData = allRatesData
    .filter(
      (item: FilteredItem) =>
        (type === "all" || item.type === type) &&
        item.apy >= minApy &&
        item.apy <= maxApy &&
        (Array.isArray(riskLevels) ? riskLevels.includes(item.risk) : true) &&
        item.minDeposit >= minDeposit
    )
    .sort((a: FilteredItem, b: FilteredItem) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "apy") return (a.apy - b.apy) * order;
      if (sortBy === "minDeposit") return (a.minDeposit - b.minDeposit) * order;
      return a.name.localeCompare(b.name) * order;
    });

  const itemsPerPage = 20;
  const currentPage = Number(searchParams.page) || 1;
  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get view mode from URL params, default to grid
  const viewMode = searchParams.view === "list" ? "list" : "grid";

  // Helper function to preserve existing search params when changing view
  const getViewToggleHref = (newView: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("view", newView);
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">APY List</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            FAQ
          </Link>
        </nav>
      </header>
      <main className="relative">
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <Filters />
            <div className="flex gap-2">
              <Link
                href={getViewToggleHref("grid")}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 w-10`}
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link
                href={getViewToggleHref("list")}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                } h-10 w-10`}
              >
                <List className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentItems.map((item: FilteredItem) => (
                <Card key={item.id}>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={`https://icons.llamao.fi/icons/chains/rsz_${item.chain.toLowerCase()}?w=48&h=48`}
                          alt={`${item.chain} icon`}
                        />
                        <AvatarFallback>{item.chain.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={`https://icons.llamao.fi/icons/protocols/${item.project.toLowerCase()}?w=48&h=48`}
                          alt={`${item.project} icon`}
                        />
                        <AvatarFallback>{item.project.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{item.apy}% APY</p>
                    <p className="text-sm text-gray-500">Provider: {item.provider}</p>
                    <p className="text-sm text-gray-500">
                      Type: <span className="capitalize">{item.type}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Risk: <span className="capitalize">{item.risk}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      TVL: ${(item.tvlUsd / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-sm text-gray-500">Chain: {item.chain}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // List View
            <div className="flex flex-col gap-2">
              {currentItems.map((item: FilteredItem) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={`https://icons.llamao.fi/icons/chains/rsz_${item.chain.toLowerCase()}?w=48&h=48`}
                        alt={`${item.chain} icon`}
                      />
                      <AvatarFallback>{item.chain.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={`https://icons.llamao.fi/icons/protocols/${item.project.toLowerCase()}?w=48&h=48`}
                        alt={`${item.project} icon`}
                      />
                      <AvatarFallback>{item.project.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{item.apy}% APY</p>
                    <p className="text-sm text-gray-500">
                      TVL: ${(item.tvlUsd / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      Risk: <span className="capitalize">{item.risk}</span>
                    </p>
                    <p className="text-sm">Chain: {item.chain}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
        </div>

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
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-6xl font-bold text-center">
            Start Finding the Best APY Rates with AI Assistance
          </h3>
        </section>
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-6xl font-bold text-center">
            Frequently Asked Questions (FAQ)
          </h3>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-2xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 APY List. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
