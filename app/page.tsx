import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Fingerprint, MountainIcon } from "lucide-react";
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
import { ModeToggle } from "@/components/theme/theme-dropdown";

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

    const limitedData = data.data;

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

  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
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
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            FAQ
          </Link>
          <ModeToggle />
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            <Fingerprint className="h-6 w-6" />
            Login
          </Link>
        </nav>
      </header>
      <main className="relative">
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
