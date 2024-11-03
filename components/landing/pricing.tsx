"use client";

import { useState } from "react";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const subscriptionPrice = {
    monthly: 7.99,
    annual: 79.99, // Doesn't include 2 months free
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16" id="pricing">
      <h2 className="text-5xl font-bold text-center mb-4">
        Simple pricing for everyone.
      </h2>
      <p className="text-xl text-center text-gray-600 mb-8">
        Choose your preferred plan to start earning passive income through our
        advanced crypto staking platform
      </p>

      {/* Pricing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span className={isAnnual ? "font-bold" : ""}>Annual</span>
        <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
          2 months free
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Subscription Plan */}
        <div className="rounded-lg border p-8 shadow-sm">
          <h3 className="text-2xl font-bold">Subscription plan</h3>
          <p className="text-gray-600 mt-2">
            Perfect for new crypto investors
          </p>
          <div className="mt-4 text-4xl font-bold">
            ${isAnnual ? subscriptionPrice.annual : subscriptionPrice.monthly}
            <span className="text-base font-normal text-gray-600">
              /{isAnnual ? "year" : "month"}
            </span>
          </div>
          <Button size="lg" variant="outline" className="w-full mt-6">
            Get Started
          </Button>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Full access to all premium features
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Advanced filtering & project insights
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              AI risk & prediction analysis
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Data export capabilities
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Early access to new features
            </li>
          </ul>
        </div>

        {/* Lifetime Deal */}
        <div className="rounded-lg border border-primary p-8 shadow-sm bg-background text-black dark:text-white relative">
          <div className="absolute top-4 right-4 inline-block px-4 py-1 rounded-full bg-gradient-to-tl from-[#00c6ff] to-[#0072ff] text-white text-sm font-medium mb-4">
            LIFETIME DEAL
          </div>
          <h3 className="text-2xl font-bold">Ultimate Staker</h3>
          <p className="text-gray-400 mt-2">
            One-time payment, lifetime access
          </p>
          <div className="mt-4 text-4xl font-bold">
            €99.99
            <span className="text-base font-normal text-gray-400">
              /lifetime
            </span>
          </div>
          <Button
            size="lg"
            className="w-full border-none mt-6 bg-gradient-to-tl from-[#00c6ff] to-[#0072ff] text-white"
          >
            <Star className="h-4 w-4" />
            Unlock Lifetime Access
          </Button>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Pay once and enjoy unlimited access
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              All premium features included
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Priority support and lifetime updates
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-green-500 h-5 w-5" />
              Early access to new features forever
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
