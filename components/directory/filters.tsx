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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define the form schema with Zod
const filterFormSchema = z.object({
  type: z.enum(["all", "bank", "crypto"]),
  minApy: z.number().min(0).max(15),
  maxApy: z.number().min(0).max(15),
  minDeposit: z.number().min(0),
  risk: z.array(z.enum(["low", "medium", "high", "very high"])),
  sortBy: z.enum(["apy", "minDeposit", "name"]),
  sortOrder: z.enum(["asc", "desc"]),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize form with current URL values
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      type: (searchParams.get("type") as FilterFormValues["type"]) || "all",
      minApy: Number(searchParams.get("minApy")) || 0,
      maxApy: Number(searchParams.get("maxApy")) || 15,
      minDeposit: Number(searchParams.get("minDeposit")) || 0,
      risk: searchParams.getAll("risk").length
        ? (searchParams.getAll("risk") as FilterFormValues["risk"])
        : ["low", "medium", "high", "very high"],
      sortBy:
        (searchParams.get("sortBy") as FilterFormValues["sortBy"]) || "apy",
      sortOrder:
        (searchParams.get("sortOrder") as FilterFormValues["sortOrder"]) ||
        "desc",
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
      type: "all",
      minApy: 0,
      maxApy: 15,
      minDeposit: 0,
      risk: ["low", "medium", "high", "very high"],
      sortBy: "apy",
      sortOrder: "desc",
    });
    router.push("/");
  };

  return (
    <div className="mb-6 bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Advanced Filters</h2>
        <Button variant="outline" onClick={resetFilters} type="button">
          Reset Filters
        </Button>
      </div>
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1 mt-1"
                  >
                    {["all", "bank", "crypto"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <FormLabel htmlFor={type} className="capitalize">
                          {type}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minApy"
            render={() => (
              <FormItem>
                <FormLabel>APY Range</FormLabel>
                <FormControl>
                  <Slider
                    value={[form.watch("minApy"), form.watch("maxApy")]}
                    max={15}
                    step={0.1}
                    onValueChange={(value) => {
                      form.setValue("minApy", value[0]);
                      form.setValue("maxApy", value[1]);
                    }}
                    className="mt-2"
                  />
                </FormControl>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{form.watch("minApy")}%</span>
                  <span>{form.watch("maxApy")}%</span>
                </div>
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
                      <FormLabel className="capitalize">{level}</FormLabel>
                    </div>
                  ))}
                </div>
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
                    <SelectItem value="minDeposit">Minimum Deposit</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
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
        </form>
      </Form>
    </div>
  );
}
