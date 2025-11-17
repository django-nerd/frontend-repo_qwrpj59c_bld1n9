export type CheckoutRequest = { amount: number; currency: string }
export type CheckoutSession = { clientSecret?: string; redirectUrl?: string }

export interface PaymentGateway {
  createCheckoutSession(req: CheckoutRequest): Promise<CheckoutSession>
}
