import { PaymentGateway, CheckoutRequest, CheckoutSession } from './gateway'

export class MockGateway implements PaymentGateway {
  async createCheckoutSession(req: CheckoutRequest): Promise<CheckoutSession> {
    return { clientSecret: `mock_${req.amount}_${req.currency}`, redirectUrl: undefined }
  }
}
