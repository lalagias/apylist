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
  FormLabel,
  FormMessage,
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
import { ChevronsUpDown } from "lucide-react";
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
  minDeposit: z.number().min(0),
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
      minDeposit: Number(searchParams.get("minDeposit")) || 0,
      risk: searchParams.getAll("risk").length
        ? (searchParams.getAll("risk") as FilterFormValues["risk"])
        : ["low", "medium", "high", "very high"],
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
      minDeposit: 0,
      risk: ["low", "medium", "high", "very high"],
      attributes: ATTRIBUTES as [string, ...string[]],
      categories: CATEGORIES as [string, ...string[]],
      sortBy: "apy",
      sortOrder: "desc",
      chains: CHAINS as [string, ...string[]],
    });
    router.push("/");
  };

  return (
    <div className="mb-6">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Tokens</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search by token name..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minApy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min APY</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxApy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max APY</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minTvl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min TVL</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxTvl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max TVL</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minDeposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Deposit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="risk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Level</FormLabel>
                <div className="flex flex-col space-y-2 mt-1">
                  {["low", "medium", "high", "very high"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(
                          level as "low" | "medium" | "high" | "very high"
                        )}
                        id={level}
                        name={level}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [
                                ...field.value,
                                level as
                                  | "low"
                                  | "medium"
                                  | "high"
                                  | "very high",
                              ]
                            : field.value.filter((v) => v !== level);
                          field.onChange(newValue);
                        }}
                      />
                      <FormLabel className="capitalize" htmlFor={level}>
                        {level}
                      </FormLabel>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Attributes</FormLabel>
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
                          : "Select attributes"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search attributes..." />
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
              <FormItem className="flex flex-col">
                <FormLabel>Categories</FormLabel>
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
                          : "Select categories"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search categories..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {CATEGORIES.map((category) => (
                            <CommandItem
                              value={category}
                              key={category}
                              onSelect={() => {
                                const currentValue = field.value ?? [];
                                const newValue = currentValue.includes(category)
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort By</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
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
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
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
              <FormItem className="flex flex-col">
                <FormLabel>Chains</FormLabel>
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
                          : "Select chains"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <div className="flex items-center gap-2 p-2 border-b">
                        <CommandInput placeholder="Search chains..." />
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
                          All
                        </Button>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={resetFilters} type="button">
          Reset Filters
        </Button>
        <DownloadButton data={data} />
        <ViewToggle />
      </div>
    </div>
  );
}
