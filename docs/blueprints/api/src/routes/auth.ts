import { Router } from 'express'
const router = Router()

router.post('/login', async (req, res) => {
  res.json({ token: 'jwt-token' })
})

router.post('/signup', async (req, res) => {
  res.status(201).json({ ok: true })
})

export default router
