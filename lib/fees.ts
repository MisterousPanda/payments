/** US public list prices reviewed October 10, 2026. Illustrative only. */

export const CARD_BPS = 290
export const CARD_FLAT_CENTS = 30
export const KEYED_BPS = 50
export const INTERNATIONAL_BPS = 150
export const ACH_BPS = 80
export const ACH_CAP_CENTS = 500
export const USDC_STRIPE_BPS = 150
export const VENMO_BPS = 349
export const VENMO_FLAT_CENTS = 49
export const ACH_CAP_DOLLARS = 625

export type Quote = {
  amountCents: number
  cardCents: number
  achCents: number
  usdcCents: number
  venmoCents: number
  achCapped: boolean
}

export function dollarsToCents(dollars: number): number {
  if (!Number.isFinite(dollars)) return 0
  return Math.round(dollars * 100)
}

export function quote(
  amountCents: number,
  extras?: { keyed?: boolean; international?: boolean },
): Quote {
  const safe = Math.max(0, Math.round(amountCents))
  const extraBps =
    (extras?.keyed ? KEYED_BPS : 0) +
    (extras?.international ? INTERNATIONAL_BPS : 0)
  const cardCents =
    Math.round((safe * (CARD_BPS + extraBps)) / 10000) + CARD_FLAT_CENTS
  const achRaw = Math.round((safe * ACH_BPS) / 10000)
  const achCents = Math.min(achRaw, ACH_CAP_CENTS)
  const usdcCents = Math.round((safe * USDC_STRIPE_BPS) / 10000)
  const venmoCents =
    Math.round((safe * VENMO_BPS) / 10000) + VENMO_FLAT_CENTS
  return {
    amountCents: safe,
    cardCents: safe === 0 ? 0 : cardCents,
    achCents: safe === 0 ? 0 : achCents,
    usdcCents: safe === 0 ? 0 : usdcCents,
    venmoCents: safe === 0 ? 0 : venmoCents,
    achCapped: achRaw >= ACH_CAP_CENTS && safe > 0,
  }
}

export function moneyFromCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export function percentOf(partCents: number, wholeCents: number): string {
  if (wholeCents <= 0) return "0.00%"
  const value = (partCents / wholeCents) * 100
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`
}

export function keepCents(amountCents: number, feeCents: number): number {
  return amountCents - feeCents
}
