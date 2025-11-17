import { useState } from 'react'
import AgeGate from './components/AgeGate'
import Storefront from './components/Storefront'

function App() {
  const [verified, setVerified] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <AgeGate minimumAge={21} onVerified={() => setVerified(true)} />
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b border-emerald-100 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-emerald-700 font-extrabold text-xl">GreenLeaf</div>
          <nav className="flex items-center gap-4 text-sm text-gray-700">
            <a href="#" className="hover:text-emerald-700">Shop</a>
            <a href="#" className="hover:text-emerald-700">About</a>
            <a href="#" className="hover:text-emerald-700">Contact</a>
          </nav>
        </div>
      </header>

      <main className="py-8">
        {verified ? (
          <Storefront />
        ) : (
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-xl border border-emerald-100 bg-white p-6 text-gray-700">
              Please verify your age to view products.
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500">
          Cannabis products are intended for adults 21+ only. Consume responsibly.
        </div>
      </footer>
    </div>
  )
}

export default App
