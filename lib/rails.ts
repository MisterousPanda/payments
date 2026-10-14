export type RailId = "card" | "apple" | "bank" | "venmo" | "zelle" | "usdc"

export type Rail = {
  id: RailId
  label: string
  instrument: string
  rail: string
  desk: string
  tag: string | null
  plaque: string
  caption: string
  clockNote: string
  figure: { src: string; alt: string } | null
}

export const RAILS: readonly Rail[] = [
  {
    id: "card",
    label: "Card",
    instrument: "Card",
    rail: "Card network",
    desk: "Stripe",
    tag: null,
    plaque: "Hold, then capture.",
    caption:
      "The network authorizes a hold; the deposit arrives about two business days after capture.",
    clockNote:
      "Available is not final. Card disputes run on a separate, longer calendar.",
    figure: null,
  },
  {
    id: "apple",
    label: "Apple Pay",
    instrument: "Apple Pay",
    rail: "Card network",
    desk: "Stripe",
    tag: "Device token",
    plaque: "Token, then the same card rail.",
    caption:
      "A device token stands in for the card number; capture and settlement still use the card rail.",
    clockNote: "Same clock as card.",
    figure: {
      src: "/rails/apple-token-rail.jpg",
      alt: "A wax circle labeled Token sits on a phone and continues through two open squares to a solid square. Apple Pay is a token on the same card rail.",
    },
  },
  {
    id: "bank",
    label: "Bank",
    instrument: "Bank",
    rail: "ACH",
    desk: "Stripe",
    tag: "Plaid · account check",
    plaque: "Verified is not settled.",
    caption:
      "Plaid only checks the account. The ACH debit settles on its own clock, and an unauthorized consumer return can still come back for about 60 days.",
    clockNote:
      "Ordinary returns, about two banking days. Unauthorized consumer debits can be returned for up to 60 days.",
    figure: {
      src: "/rails/bank-check-gap.jpg",
      alt: "A brass seal ends on a short line. A wax parcel sits on a later line that has not reached the square. Checking the account is not the money arriving.",
    },
  },
  {
    id: "venmo",
    label: "Venmo",
    instrument: "Venmo",
    rail: "PayPal",
    desk: "Payout",
    tag: null,
    plaque: "A second button, a different desk.",
    caption:
      "On a website, Venmo is PayPal Checkout for US buyers. The standard domestic rate on PayPal’s page is 3.49% + $0.49. It does not settle inside Stripe.",
    clockNote:
      "The buyer approves in the Venmo app. The money is in PayPal until a payout. This clock does not time that payout.",
    figure: {
      src: "/rails/venmo-paypal-path.jpg",
      alt: "A wax dot on a phone reaches a square on one brass line. A broken line above it does not. Venmo on the web ends at PayPal, not on the card rail.",
    },
  },
  {
    id: "zelle",
    label: "Zelle",
    instrument: "Zelle",
    rail: "Bank app",
    desk: "Your bank",
    tag: null,
    plaque: "The customer pushes. You do not pull.",
    caption:
      "Enroll the LLC’s account at a bank that offers Zelle for that account. The customer sends to your email, U.S. mobile number, or Zelle tag. The fee and the limit are the bank’s, and a screenshot is not the deposit.",
    clockNote:
      "Typically minutes when both sides are enrolled. Not a card dispute and not an ACH return. Purchase protection is generally not included.",
    figure: {
      src: "/rails/zelle-direct.jpg",
      alt: "A wax dot sits on a brass line between two squares. Zelle moves from the customer’s bank to the business account with no processor in the middle.",
    },
  },
  {
    id: "usdc",
    label: "USDC",
    instrument: "USDC wallet",
    rail: "Solana",
    desk: "Stripe",
    tag: null,
    plaque: "Final on the rail.",
    caption:
      "Solana finality is seconds. Stripe’s 1.5% is the fee; this transfer has no card-style return window.",
    clockNote:
      "This mark is on-chain finality for USDC the LLC keeps. Cashing out to a bank is a different clock and is not drawn.",
    figure: null,
  },
]

export function railById(id: RailId): Rail {
  const rail = RAILS.find((item) => item.id === id)
  if (!rail) throw new Error(`Unknown rail ${id}`)
  return rail
}
