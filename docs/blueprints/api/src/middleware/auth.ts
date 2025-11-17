import { Request, Response, NextFunction } from 'express'

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Unauthorized' })
  // verify JWT or session here
  ;(req as any).user = { id: 'user_123' }
  next()
}
