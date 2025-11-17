import { useEffect, useState } from 'react'

const STORAGE_KEY = 'age_verified_21'

export default function AgeGate({ minimumAge = 21, onVerified }) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'true') {
      setOpen(false)
      onVerified?.()
    }
  }, [onVerified])

  const handleVerify = (is21) => {
    if (is21) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setOpen(false)
      onVerified?.()
    } else {
      alert(`You must be ${minimumAge}+ to enter.`)
      // Keep modal open
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Age Verification</h2>
        <p className="text-gray-600 mb-6">You must be at least {minimumAge} years old to enter this site.</p>
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 transition"
            onClick={() => handleVerify(false)}
          >
            I'm under {minimumAge}
          </button>
          <button
            className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 transition"
            onClick={() => handleVerify(true)}
          >
            I'm {minimumAge}+
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">By entering, you confirm that you are of legal age in your jurisdiction.</p>
      </div>
    </div>
  )
}
