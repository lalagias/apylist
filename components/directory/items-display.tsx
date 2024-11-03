'use client'

import { useLayoutStore } from "@/store/layout-store"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

export function ItemsDisplay({ items }: { items: FilteredItem[] }) {
  const { viewMode } = useLayoutStore()

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
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
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
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
  )
} 