"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewToggle } from "@/components/directory/view-toggle";
import { FilteredItem } from "@/types/data";
import { DownloadButton } from "@/components/directory/download-button";
import { ATTRIBUTES, CATEGORIES, CHAINS } from "@/data/filters-data";

// Define the form schema with Zod
const filterFormSchema = z.object({
  search: z.string().optional(),
  minApy: z.number().min(0).max(15),
  maxApy: z.number().min(0).max(15),
  minTvl: z.number().min(0),
  maxTvl: z.number().min(0),
  risk: z.array(z.enum(["low", "medium", "high", "very high"])),
  attributes: z.array(z.enum(ATTRIBUTES as [string, ...string[]])),
  categories: z.array(z.enum(CATEGORIES as [string, ...string[]])),
  sortBy: z.enum(["apy", "tvl"]),
  sortOrder: z.enum(["asc", "desc"]),
  chains: z.array(z.enum(CHAINS as [string, ...string[]])),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

export function Filters({ data }: { data: FilteredItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize form with proper default values from searchParams
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
      minApy: Number(searchParams.get("minApy")) || 0,
      maxApy: Number(searchParams.get("maxApy")) || 15,
      minTvl: Number(searchParams.get("minTvl")) || 0,
      maxTvl: Number(searchParams.get("maxTvl")) || 0,
      risk: searchParams.getAll("risk") as FilterFormValues["risk"] || [],
      attributes:
        (searchParams.getAll("attributes") as FilterFormValues["attributes"]) ||
        [],
      categories: searchParams.getAll(
        "categories"
      ) as FilterFormValues["categories"],
      sortBy:
        (searchParams.get("sortBy") as FilterFormValues["sortBy"]) || "apy",
      sortOrder:
        (searchParams.get("sortOrder") as FilterFormValues["sortOrder"]) ||
        "desc",
      chains:
        (searchParams.getAll("chains") as FilterFormValues["chains"]) || [],
    },
  });

  const onSubmit = (values: FilterFormValues) => {
    const params = new URLSearchParams();

    // Update URL with form values
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    form.reset({
      search: "",
      minApy: 0,
      maxApy: 15,
      minTvl: 0,
      maxTvl: 0,
      risk: [],
      attributes: [],
      categories: [],
      sortBy: "apy",
      sortOrder: "desc",
      chains: [],
    });
    router.push("/");
  };

  return (
    <div className="mb-6">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search by token name..."
                      {...field}
                      className="pl-8 w-full"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-8 gap-4 mb-4 w-full">
            <FormField
              control={form.control}
              name="minApy"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between text-muted-foreground">
                          {field.value === 0 && form.getValues("maxApy") === 15
                            ? "APY"
                            : `APY: ${field.value}-${form.getValues("maxApy")}%`}
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="flex flex-col gap-2">
                          <FormItem>
                            <FormLabel>Minimum APY</FormLabel>
                            <FormControl>
                              <Input
                                id="minApy"
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                          </FormItem>
                          <FormField
                            control={form.control}
                            name="maxApy"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maximum APY</FormLabel>
                                <FormControl>
                                  <Input
                                    id="maxApy"
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minTvl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between text-muted-foreground">
                          {field.value === 0 && form.getValues("maxTvl") === 0
                            ? "TVL"
                            : `TVL: ${field.value}-${form.getValues("maxTvl")}`}
                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="flex flex-col gap-2">
                          <FormItem>
                            <FormLabel>Minimum TVL</FormLabel>
                            <FormControl>
                              <Input
                                id="minTvl"
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                          </FormItem>
                          <FormField
                            control={form.control}
                            name="maxTvl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Maximum TVL</FormLabel>
                                <FormControl>
                                  <Input
                                    id="maxTvl"
                                    type="number"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="risk"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} selected`
                            : "Risk Level"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <div className="flex flex-col gap-2 p-2 border-b">
                          <CommandInput placeholder="Search risk levels..." />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange([])}
                              className="h-8"
                            >
                              Clear
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange(["low", "medium", "high", "very high"])}
                              className="h-8"
                            >
                              Toggle all
                            </Button>
                          </div>
                        </div>
                        <CommandList>
                          <CommandEmpty>No risk level found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {["low", "medium", "high", "very high"].map(
                              (level) => (
                                <CommandItem
                                  value={level}
                                  key={level}
                                  onSelect={() => {
                                    const currentValue = field.value ?? [];
                                    const newValue = currentValue.includes(level as "low" | "medium" | "high" | "very high")
                                      ? currentValue.filter((v) => v !== level)
                                      : [...currentValue, level as "low" | "medium" | "high" | "very high"];
                                    field.onChange(newValue);
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <span className="capitalize">{level}</span>
                                  <Checkbox
                                    className="h-4 w-4"
                                    checked={field.value?.includes(level as "low" | "medium" | "high" | "very high")}
                                  />
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attributes"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} selected`
                            : "Attributes"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <div className="flex flex-col gap-2 p-2 border-b">
                          <CommandInput placeholder="Search attributes..." />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange([])}
                              className="h-8"
                            >
                              Clear
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange(ATTRIBUTES)}
                              className="h-8"
                            >
                              Toggle all
                            </Button>
                          </div>
                        </div>
                        <CommandList>
                          <CommandEmpty>No attribute found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {ATTRIBUTES.map((attribute) => (
                              <CommandItem
                                value={attribute}
                                key={attribute}
                                onSelect={() => {
                                  const newValue = field.value?.includes(
                                    attribute
                                  )
                                    ? field.value.filter((v) => v !== attribute)
                                    : [...(field.value || []), attribute];
                                  field.onChange(newValue);
                                }}
                                className="flex items-center justify-between"
                              >
                                {attribute}
                                <Checkbox
                                  className="h-4 w-4"
                                  checked={field.value?.includes(attribute)}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} selected`
                            : "Categories"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <div className="flex flex-col gap-2 p-2 border-b">
                          <CommandInput placeholder="Search categories..." />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange([])}
                              className="h-8"
                            >
                              Clear
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange(CATEGORIES)}
                              className="h-8"
                            >
                              Toggle all
                            </Button>
                          </div>
                        </div>
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {CATEGORIES.map((category) => (
                              <CommandItem
                                value={category}
                                key={category}
                                onSelect={() => {
                                  const currentValue = field.value ?? [];
                                  const newValue = currentValue.includes(
                                    category
                                  )
                                    ? currentValue.filter((v) => v !== category)
                                    : [...currentValue, category];
                                  field.onChange(newValue);
                                }}
                                className="flex items-center justify-between"
                              >
                                {category}
                                <Checkbox
                                  className="h-4 w-4"
                                  checked={field.value?.includes(category)}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apy">APY</SelectItem>
                      <SelectItem value="tvl">TVL</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Sort order" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chains"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} selected`
                            : "Chains"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <div className="flex flex-col gap-2 p-2 border-b">
                          <CommandInput placeholder="Search chains..." />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange([])}
                              className="h-8"
                            >
                              Clear
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => field.onChange(CHAINS)}
                              className="h-8"
                            >
                              Toggle all
                            </Button>
                          </div>
                        </div>
                        <CommandList>
                          <CommandEmpty>No chain found.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-auto">
                            {CHAINS.map((chain) => (
                              <CommandItem
                                value={chain}
                                key={chain}
                                onSelect={() => {
                                  const newValue = field.value?.includes(chain)
                                    ? field.value.filter((v) => v !== chain)
                                    : [...(field.value || []), chain];
                                  field.onChange(newValue);
                                }}
                                className="flex items-center justify-between"
                              >
                                {chain}
                                <Checkbox
                                  className="h-4 w-4"
                                  checked={field.value?.includes(chain)}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex items-center justify-end w-full gap-4 mb-4">
        <Button onClick={resetFilters} type="button">
          Reset Filters
        </Button>
        <DownloadButton data={data} />
        <ViewToggle />
      </div>
    </div>
  );
}
