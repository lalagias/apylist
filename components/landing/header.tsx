'use client'

import Link from 'next/link'
import { Fingerprint, Menu, MountainIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/theme/theme-dropdown"

export default function Header() {
  return (
    <header className="bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">APY List</span>
          </Link>
        </div>

        {/* Center links - visible on desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="#pricing" className="text-sm font-semibold leading-6 text-foreground">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-semibold leading-6 text-foreground">
            FAQ
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="inline-flex items-center justify-center">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-6">
                <Link href="#pricing" className="text-sm font-semibold leading-6 text-foreground">
                  Pricing
                </Link>
                <Link href="#faq" className="text-sm font-semibold leading-6 text-foreground">
                  FAQ
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground"
                >
                  <span>Login</span>
                  <Fingerprint className="h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <ModeToggle />
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-semibold leading-6 text-foreground"
          >
            <span>Login</span>
            <Fingerprint className="h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  )
}
