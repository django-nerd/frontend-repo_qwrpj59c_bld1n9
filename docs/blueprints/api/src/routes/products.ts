import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  // return products with filters
  res.json({ items: [], facets: { count: 0 } })
})

router.get('/:slug', async (req, res) => {
  // return product by slug
  res.json({ slug: req.params.slug })
})

export default router
