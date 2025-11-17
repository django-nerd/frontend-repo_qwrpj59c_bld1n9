import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import cartRouter from './routes/cart'
import ordersRouter from './routes/orders'
import productsRouter from './routes/products'
import authRouter from './routes/auth'
import { geoGuard } from './middleware/geo'

const app = express()
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: process.env.WEB_ORIGIN || 'http://localhost:3000', credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())
app.use(rateLimit({ windowMs: 60_000, max: 120 }))
app.use(geoGuard)

app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)
app.use('/products', productsRouter)
app.use('/auth', authRouter)

app.get('/health', (_req, res) => res.json({ ok: true }))

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on :${port}`))
