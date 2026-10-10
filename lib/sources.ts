export type Source = {
  name: string
  href: string
  note: string
  group: "Stripe" | "Bank" | "Wallets" | "Crypto" | "Rules"
}

export const SOURCES: readonly Source[] = [
  {
    group: "Stripe",
    name: "Stripe US pricing",
    href: "https://stripe.com/pricing",
    note: "Domestic cards at 2.9% + 30¢, and the pricing policy that rates can change.",
  },
  {
    group: "Stripe",
    name: "Local payment methods",
    href: "https://stripe.com/pricing/local-payment-methods",
    note: "ACH Direct Debit, wallets, and instant bank payments.",
  },
  {
    group: "Stripe",
    name: "ACH Direct Debit",
    href: "https://docs.stripe.com/payments/ach-direct-debit",
    note: "Timing for standard and two-day bank debits.",
  },
  {
    group: "Stripe",
    name: "Financial Connections",
    href: "https://docs.stripe.com/financial-connections",
    note: "Stripe’s own bank-linking product, default on hosted ACH.",
  },
  {
    group: "Stripe",
    name: "Apple Pay on the web",
    href: "https://docs.stripe.com/apple-pay",
    note: "Hosted Checkout shows Apple Pay without a separate Apple contract.",
  },
  {
    group: "Stripe",
    name: "Google Pay",
    href: "https://docs.stripe.com/google-pay",
    note: "A dashboard toggle. The underlying charge is still a card.",
  },
  {
    group: "Stripe",
    name: "Samsung Pay",
    href: "https://docs.stripe.com/payments/samsung-pay",
    note: "Documented as a South Korean method, not a default US wallet.",
  },
  {
    group: "Stripe",
    name: "Stablecoin payments",
    href: "https://docs.stripe.com/payments/stablecoin-payments",
    note: "USDC on Solana among other chains, settled into the Stripe balance.",
  },
  {
    group: "Stripe",
    name: "Statement descriptors",
    href: "https://docs.stripe.com/get-started/account/statement-descriptors",
    note: "The 5 to 22 character line a customer sees on a statement.",
  },
  {
    group: "Stripe",
    name: "Acceptable verification documents",
    href: "https://docs.stripe.com/acceptable-verification-documents",
    note: "How an EIN entity proves its legal name.",
  },
  {
    group: "Bank",
    name: "Plaid Auth",
    href: "https://plaid.com/docs/auth/",
    note: "Account and routing numbers. Plaid says it is not the processor on this path.",
  },
  {
    group: "Bank",
    name: "Plaid and Stripe",
    href: "https://plaid.com/docs/auth/partnerships/stripe/",
    note: "A processor token handed to Stripe. Not the hosted default.",
  },
  {
    group: "Bank",
    name: "Nacha, limitation on warranty claims",
    href: "https://www.nacha.org/rules/limitation-warranty-claims",
    note: "How long an unauthorized consumer debit can be returned.",
  },
  {
    group: "Bank",
    name: "FedNow",
    href: "https://www.frbservices.org/financial-services/fednow",
    note: "Instant credit push. Both banks have to participate.",
  },
  {
    group: "Bank",
    name: "RTP from The Clearing House",
    href: "https://www.theclearinghouse.org/payment-systems/rtp",
    note: "The other US instant credit network. No direct debit.",
  },
  {
    group: "Wallets",
    name: "Configure Apple Pay on the web",
    href: "https://developer.apple.com/help/account/capabilities/configure-apple-pay-on-the-web/",
    note: "The do-it-yourself merchant ID, certificate, and domain file.",
  },
  {
    group: "Wallets",
    name: "Google Pay web setup",
    href: "https://developers.google.com/pay/api/web/guides/setup",
    note: "Google is not in the money flow. A processor still clears the card.",
  },
  {
    group: "Wallets",
    name: "PayPal: accept Venmo",
    href: "https://www.paypal.com/us/business/accept-payments/accept-venmo",
    note: "Website Venmo is PayPal Checkout, for US buyers.",
  },
  {
    group: "Wallets",
    name: "Venmo business profiles",
    href: "https://venmo.com/business/profiles",
    note: "The in-app and QR product. A different fee from website checkout.",
  },
  {
    group: "Wallets",
    name: "American Express OptBlue",
    href: "https://www.americanexpress.com/us/merchant/optblue.html",
    note: "Accept Amex through your processor under the published volume line.",
  },
  {
    group: "Wallets",
    name: "Stripe PCI guide",
    href: "https://stripe.com/guides/pci-compliance",
    note: "Hosted Checkout and Elements, and the annual self-assessment.",
  },
  {
    group: "Crypto",
    name: "USDC on Solana",
    href: "https://www.circle.com/multi-chain-usdc/solana",
    note: "Native USDC, and why the mint matters.",
  },
  {
    group: "Crypto",
    name: "USDC contract addresses",
    href: "https://developers.circle.com/stablecoins/usdc-contract-addresses",
    note: "Mainnet and devnet mints. Bridged tokens are not these.",
  },
  {
    group: "Crypto",
    name: "Solana Pay specification",
    href: "https://solana.com/docs/tools/solana-pay/specification/version1",
    note: "The solana: transfer request: recipient, amount, mint, reference.",
  },
  {
    group: "Crypto",
    name: "Solana fees",
    href: "https://solana.com/docs/core/fees",
    note: "Base fee of 5,000 lamports per signature.",
  },
  {
    group: "Crypto",
    name: "IRS digital assets",
    href: "https://www.irs.gov/filing/digital-assets",
    note: "Digital assets are property. This page is not tax advice.",
  },
  {
    group: "Rules",
    name: "OFAC FAQ 560",
    href: "https://ofac.treasury.gov/faqs/560",
    note: "Sanctions duties apply to digital currency the same way they apply to dollars.",
  },
]

export const DRAWER_SOURCES = [
  "Stripe US pricing",
  "Local payment methods",
  "ACH Direct Debit",
  "Nacha, limitation on warranty claims",
  "Solana fees",
] as const
