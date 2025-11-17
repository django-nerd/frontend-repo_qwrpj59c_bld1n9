import { useEffect, useState, useMemo } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

const categories = [
  { key: 'bud', label: 'Bud' },
  { key: 'vapes', label: 'Vapes' },
  { key: 'edibles', label: 'Edibles' },
]

function CategoryTabs({ value, onChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
            value === c.key
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

function ProductCard({ p }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col">
      <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-emerald-50 to-green-100 mb-3" />
      <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{p.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
        <span className="font-bold text-gray-900">${p.price?.toFixed?.(2) ?? p.price}</span>
        <span className="rounded-full bg-gray-100 px-2 py-0.5">{p.category}</span>
      </div>
      {(p.thc_mg || p.cbd_mg) && (
        <div className="text-xs text-gray-500 mb-3">
          {p.thc_mg ? `THC ${p.thc_mg}mg` : ''}
          {p.thc_mg && p.cbd_mg ? ' · ' : ''}
          {p.cbd_mg ? `CBD ${p.cbd_mg}mg` : ''}
        </div>
      )}
      <button className="mt-auto rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 transition">Add to cart</button>
    </div>
  )
}

export default function Storefront() {
  const [policy, setPolicy] = useState(null)
  const [category, setCategory] = useState('bud')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // fetch policy once
    fetch(`${API_BASE}/policy`)
      .then((r) => r.json())
      .then(setPolicy)
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API_BASE}/products?category=${category}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then(setItems)
      .catch((e) => setError(e.message || 'Failed to load products'))
      .finally(() => setLoading(false))
  }, [category])

  const disclaimer = useMemo(() => {
    const min = policy?.minimum_age ?? 21
    return `For adults ${min}+ only. Keep out of reach of children. Use responsibly.`
  }, [policy])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Cannabis Shop</h1>
        <p className="text-gray-600">{disclaimer}</p>
      </div>

      <CategoryTabs value={category} onChange={setCategory} />

      {loading && <p className="text-gray-600">Loading products…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />)
        )}
      </div>
    </div>
  )
}
