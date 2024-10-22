"use client";
import confetti from "canvas-confetti";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  email: z.string().email(),
});

export default function Home() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    handleConfetti();
  }

  return (
    <>
      <header></header>
      <main className="relative">
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10">
          <h1 className="text-6xl font-bold text-center">
            Find the Best APY Rates Instantly
          </h1>
          <p className="text-2xl max-w-2xl font-semibold text-center text-gray-500">
            Our AI-driven platform helps you find the highest Annual Percentage
            Yields across financial institutions, tailored just for you.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="text-lg">
              💰 Find the Best APY Rates from trusted financial platforms in
              real-time.
            </li>
            <li className="text-lg">
              🤖 AI-Powered Recommendations personalized to your savings and
              investment goals.
            </li>
            <li className="text-lg">
              📈 Track APY Trends and get insights to maximize your returns.
            </li>
            <li className="text-lg">
              🔔 Get Instant Notifications when new high-yield APY offers become
              available.
            </li>
            <li className="text-lg">
              🏦 Compare Across Multiple Platforms, including banks, crypto, and
              more, with ease.
            </li>
          </ul>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name@email.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-green-700">
                Join the Waitlist
              </Button>
            </form>
          </Form>
        </section>
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
                set your preferences, we’ll notify you whenever top APY offers
                that match your criteria become available, helping you maximize
                your returns effortlessly.
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold">What Our Users Are Saying</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>John D.</CardTitle>
                <CardDescription>Crypto Investor</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  I used to spend hours looking for the best crypto APYs. With
                  apylist.ai, I get personalized recommendations, and I’ve
                  already boosted my returns by 15%. The AI filtering is a
                  game-changer.
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Sarah K.</CardTitle>
                <CardDescription>Finance Enthusiast</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  I love how easy it is to use apylist.ai. I set up my filters
                  for the best traditional savings accounts, and now I get
                  instant alerts when new offers come up. It’s saving me so much
                  time!
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Michael B.</CardTitle>
                <CardDescription>Entrepreneur</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  As someone who’s always looking for better returns,
                  apylist.ai’s AI-powered alerts have been invaluable. I no
                  longer have to manually search for APY offers. This tool does
                  it all for me.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-6xl font-bold text-center">
            Start Finding the Best APY Rates with AI Assistance
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name@email.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-green-700">
                Join the Waitlist
              </Button>
            </form>
          </Form>
        </section>
        <section className="h-screen flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto">
          <h3 className="text-6xl font-bold text-center">
            Frequently Asked Questions (FAQ)
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does APY List use AI to find the best APY rates?
              </AccordionTrigger>
              <AccordionContent>
                Our AI analyzes APY rates from various sources in real-time,
                delivering personalized recommendations based on your
                preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How often is the data updated?
              </AccordionTrigger>
              <AccordionContent>
                The data is updated continuously, ensuring you have the most
                up-to-date information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is APY LIst free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, the platform is free to browse and sign up for. Premium
                features will be available soon.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I receive personalized alerts for the best rates?
              </AccordionTrigger>
              <AccordionContent>
                Yes, our AI-powered notifications will keep you informed when
                top deals match your criteria.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
