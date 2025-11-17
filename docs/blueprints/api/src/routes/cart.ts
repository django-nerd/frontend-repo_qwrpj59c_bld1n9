import { Router } from 'express'
import { requireUser } from '../middleware/auth'
import { PaymentGateway } from '../payments/gateway'
import { MockGateway } from '../payments/mockGateway'

const router = Router()
const gateway: PaymentGateway = process.env.PAYMENT_PROVIDER === 'mock' ? new MockGateway() : new MockGateway() // replace with compliant provider only if legal

router.get('/', (req, res) => {
  // read from session/cookie or DB
  res.json({ items: [], subtotal: 0, discounts: 0, tax: 0, total: 0 })
})

router.post('/items', (req, res) => {
  // add item to cart
  res.status(201).json({ ok: true })
})

router.delete('/items/:itemId', (req, res) => {
  // remove item
  res.json({ ok: true })
})

router.post('/apply-code', (req, res) => {
  // validate promo code
  res.json({ ok: true, discount: 0 })
})

router.post('/checkout', requireUser, async (req, res) => {
  // calculate totals + taxes + compliance validation
  const { amount, currency = 'usd' } = req.body
  const session = await gateway.createCheckoutSession({ amount, currency })
  res.json({ clientSecret: session.clientSecret, redirectUrl: session.redirectUrl })
})

export default router
