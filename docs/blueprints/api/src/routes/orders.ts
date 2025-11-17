import { Router } from 'express'
import { requireUser } from '../middleware/auth'

const router = Router()

router.get('/', requireUser, async (req, res) => {
  // list orders for user
  res.json({ items: [] })
})

router.get('/:id', requireUser, async (req, res) => {
  // order detail
  res.json({ id: req.params.id })
})

router.post('/webhook', async (req, res) => {
  // verify signature from payment processor
  // update order status accordingly
  res.status(200).end()
})

export default router
