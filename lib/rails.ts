export type RailId = "card" | "apple" | "bank" | "usdc"

export type Rail = {
  id: RailId
  label: string
  instrument: string
  rail: string
  tag: string | null
  plaque: string
  caption: string
  clockNote: string
}

export const RAILS: readonly Rail[] = [
  {
    id: "card",
    label: "Card",
    instrument: "Card",
    rail: "Card network",
    tag: null,
    plaque: "Hold, then capture.",
    caption:
      "The network authorizes a hold; the deposit arrives about two business days after capture.",
    clockNote:
      "Available is not final. Card disputes run on a separate, longer calendar.",
  },
  {
    id: "apple",
    label: "Apple Pay",
    instrument: "Apple Pay",
    rail: "Card network",
    tag: "Device token",
    plaque: "Token, then the same card rail.",
    caption:
      "A device token stands in for the card number; capture and settlement still use the card rail.",
    clockNote: "Same clock as card.",
  },
  {
    id: "bank",
    label: "Bank",
    instrument: "Bank",
    rail: "ACH",
    tag: "Plaid · account check",
    plaque: "Verified is not settled.",
    caption:
      "Plaid only checks the account. The ACH debit settles on its own, slower clock.",
    clockNote:
      "Ordinary returns, about two banking days. Unauthorized consumer debits can be returned for up to 60 days.",
  },
  {
    id: "usdc",
    label: "USDC",
    instrument: "USDC wallet",
    rail: "Solana",
    tag: null,
    plaque: "Final on the rail.",
    caption:
      "Solana finality is seconds. Stripe’s 1.5% is the fee; this transfer has no card-style return window.",
    clockNote:
      "This mark is on-chain finality for USDC the LLC keeps. Cashing out to a bank is a different clock and is not drawn.",
  },
]

export function railById(id: RailId): Rail {
  const rail = RAILS.find((item) => item.id === id)
  if (!rail) throw new Error(`Unknown rail ${id}`)
  return rail
}
