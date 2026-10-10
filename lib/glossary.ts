export type Term = {
  name: string
  body: string
  href?: string
}

export const TERMS: readonly Term[] = [
  {
    name: "ACH",
    body: "The US batch network for bank debits and credits. Not instant, and a debit can be returned after it looks successful.",
    href: "/bank",
  },
  {
    name: "Acquirer",
    body: "The institution that submits a card charge to the networks and settles with the merchant. On a Stripe account, Stripe plays this role. You do not open a second merchant account at a bank.",
    href: "/path",
  },
  {
    name: "Authorization",
    body: "The issuer’s yes to a hold. It is not a deposit in the LLC’s bank.",
    href: "/",
  },
  {
    name: "Capture",
    body: "The step that turns an approved hold into a charge that can settle. Some flows authorize and capture together.",
    href: "/",
  },
  {
    name: "Chargeback",
    body: "A card dispute. The network’s process, not an ACH return and not a crypto refund. Networks count disputes even when the merchant wins.",
    href: "/cards",
  },
  {
    name: "Descriptor",
    body: "The text on the customer’s card statement. 5 to 22 characters on Stripe, at least one letter, and recognizable as the business.",
    href: "/path",
  },
  {
    name: "EIN",
    body: "The IRS employer identification number. Stripe checks it against an IRS letter, not against the SS-4 application form.",
    href: "/path",
  },
  {
    name: "FedNow",
    body: "The Federal Reserve’s instant credit-push network. Both banks must participate. It is not a debit you can pull.",
    href: "/bank",
  },
  {
    name: "Finality",
    body: "The point after which a transfer will not be reorganized away. On Solana, finalized is the stronger commitment, roughly 13 seconds behind confirmed.",
    href: "/crypto",
  },
  {
    name: "Financial Connections",
    body: "Stripe’s bank-linking product, and the default for hosted ACH. It is not Plaid.",
    href: "/bank",
  },
  {
    name: "Interchange",
    body: "The fee between the merchant’s bank and the cardholder’s bank. On a blended rate you do not see it as its own line.",
    href: "/cards",
  },
  {
    name: "Link",
    body: "Stripe’s saved-payment wallet. A Link card payment is priced like a card. It is not Apple Pay, and it is not Plaid Link.",
    href: "/cards",
  },
  {
    name: "Mint",
    body: "The on-chain identity of a token. Native USDC on Solana has one mint. A bridged token with a similar name is a different asset.",
    href: "/crypto",
  },
  {
    name: "OptBlue",
    body: "American Express’s program for accepting Amex through your existing processor, generally under $3 million of estimated annual Amex volume.",
    href: "/cards",
  },
  {
    name: "Originator",
    body: "In ACH, the party that has the customer’s authorization and starts the debit. That is the LLC, even when a processor submits the file.",
    href: "/bank",
  },
  {
    name: "PAN",
    body: "The full card number. It does not belong in your database, your logs, or your prompts. A processor token is the thing you may store.",
    href: "/cards",
  },
  {
    name: "Payment Link",
    body: "A Stripe-hosted page you can share without writing code. Right for a single product, a donation, or a tip.",
    href: "/path",
  },
  {
    name: "Payout",
    body: "The transfer from the Stripe balance to the LLC’s bank. Separate from the moment a charge becomes available.",
    href: "/path",
  },
  {
    name: "PCI DSS",
    body: "The card-industry security standard. Hosted fields keep you on the smallest questionnaire. They do not remove the annual self-assessment.",
    href: "/cards",
  },
  {
    name: "Plaid Auth",
    body: "A data product that returns account and routing details so a processor can move money. On that path Plaid is not the processor.",
    href: "/bank",
  },
  {
    name: "Processor",
    body: "The company the LLC signs with. Stripe, Square, PayPal, Adyen. Wallets and networks are not this layer.",
    href: "/cards",
  },
  {
    name: "Reference",
    body: "A unique address on a Solana Pay request that ties one transfer to one order. It is not a seed phrase and not a wallet.",
    href: "/studio",
  },
  {
    name: "RTP",
    body: "The Clearing House’s instant credit network. Final, 24/7, both banks required, no direct debit.",
    href: "/bank",
  },
  {
    name: "SAQ A",
    body: "The PCI self-assessment for a merchant who fully outsources the card form. A form that posts the card number to your server is not SAQ A.",
    href: "/cards",
  },
  {
    name: "Settlement",
    body: "The point at which funds from a charge become available to pay out. For a US card on Stripe, often two business days. Not the same word as Solana finality.",
    href: "/",
  },
  {
    name: "Stablecoin",
    body: "A token designed to track a dollar. USDC is Circle’s. The design goal is not a government guarantee.",
    href: "/crypto",
  },
  {
    name: "USDC",
    body: "Circle’s dollar stablecoin. On Solana, accept the native mint only. Holding it is not the same as a bank balance.",
    href: "/crypto",
  },
  {
    name: "WEB",
    body: "The Nacha code for a consumer debit authorized over the internet. It requires account validation, not just a typed routing number you hope is real.",
    href: "/bank",
  },
]
