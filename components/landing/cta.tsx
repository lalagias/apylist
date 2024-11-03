import { Pickaxe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function CTA() {
  return (
    <section className="bg-gradient-to-tl from-[#00c6ff] to-[#0072ff] rounded-lg py-24 mb-10">
      <div className="container mx-auto text-center px-4">
        <p className="text-white font-medium mb-4">
          READY TO MAXIMIZE YOUR STAKING RETURNS?
        </p>
        <h2 className="text-5xl font-bold text-white mb-8">
          Find the best staking APY rates.
        </h2>
        <Button variant="secondary" asChild>
          <Link href="#pricing">
            <Pickaxe className="w-4 h-4" />
            Compare Staking Rates
          </Link>
        </Button>
      </div>
    </section>
  )
}
