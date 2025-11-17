// Next.js 14 (App Router) — Product Listing Page with SSR Filters
import 'server-only'
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Cannabis Products — Example Dispensary',
  description: 'Browse lab-tested cannabis products with COAs. Filter by type, potency, and price.'
}

async function getProducts(searchParams: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams()
  if (searchParams.q && typeof searchParams.q === 'string') query.set('q', searchParams.q)
  if (searchParams.type && typeof searchParams.type === 'string') query.set('type', searchParams.type)
  if (searchParams.max && typeof searchParams.max === 'string') query.set('max', searchParams.max)
  if (searchParams.min && typeof searchParams.min === 'string') query.set('min', searchParams.min)
  if (searchParams.potency && typeof searchParams.potency === 'string') query.set('potency', searchParams.potency)

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  const res = await fetch(`${api}/products?${query.toString()}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to load products')
  return res.json() as Promise<{ items: any[]; facets: Record<string, any> }>
}

export default async function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { items, facets } = await getProducts(searchParams)

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Shop Products</h1>
        <p className="text-muted-foreground">All items are lab-tested. Verify COAs on each product page.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-4" aria-label="Filters">
          <form className="space-y-3" action="/products" method="get">
            <input aria-label="Search" name="q" placeholder="Search" className="w-full border rounded px-3 py-2" defaultValue={typeof searchParams.q === 'string' ? searchParams.q : ''} />
            <select name="type" className="w-full border rounded px-3 py-2" defaultValue={typeof searchParams.type === 'string' ? searchParams.type : ''}>
              <option value="">All Types</option>
              <option value="flower">Flower</option>
              <option value="edible">Edibles</option>
              <option value="concentrate">Concentrates</option>
              <option value="vape">Vapes</option>
              <option value="tincture">Tinctures</option>
              <option value="topical">Topicals</option>
            </select>
            <div className="flex gap-2">
              <input name="min" type="number" step="0.01" placeholder="Min $" className="w-1/2 border rounded px-3 py-2" />
              <input name="max" type="number" step="0.01" placeholder="Max $" className="w-1/2 border rounded px-3 py-2" />
            </div>
            <select name="potency" className="w-full border rounded px-3 py-2">
              <option value="">Any potency</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className="w-full bg-black text-white rounded px-4 py-2" type="submit">Apply Filters</button>
          </form>
          {facets && (
            <div>
              <h2 className="font-medium mb-2">Popular filters</h2>
              <ul className="text-sm text-muted-foreground list-disc pl-5">
                <li>{facets.count} products</li>
              </ul>
            </div>
          )}
        </aside>

        <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <article key={p.id} className="border rounded-lg overflow-hidden bg-white">
              <Link href={`/products/${p.slug}`} className="block">
                <img src={p.images?.[0]?.url || '/placeholder.png'} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">${'{'}p.price.toFixed(2){'}'}</span>
                    <span className="text-xs text-muted-foreground">{p.type}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </section>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Cannabis Products',
          breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: '/' }, { '@type': 'ListItem', position: 2, name: 'Products', item: '/products' }] }
        })}
      </script>
    </main>
  )
}
