import { Request, Response, NextFunction } from 'express'

// Server-side geoblocking stub. Replace with a provider (MaxMind, Cloudflare) and local law rules.
export function geoGuard(req: Request, res: Response, next: NextFunction) {
  const blocked = false // compute from IP + route + product restrictions
  if (blocked) return res.status(451).json({ error: 'Unavailable for Legal Reasons' })
  next()
}
