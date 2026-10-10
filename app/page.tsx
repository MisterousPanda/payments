import Link from "next/link"
import { Clearing } from "@/components/Clearing"
import { FeeRuler } from "@/components/FeeRuler"
import { SettlementClock } from "@/components/SettlementClock"
import { SourceDrawer } from "@/components/SourceDrawer"
import { WalletShelf } from "@/components/WalletShelf"

const MYTHS = [
  {
    title: "Apple Pay is not a second merchant account.",
    body: "It is a device token on the same card rail. Capture and the dispute calendar do not change.",
  },
  {
    title: "Plaid does not deposit the money.",
    body: "Auth returns an account so a processor can originate ACH. Stripe’s own linker is Financial Connections.",
  },
  {
    title: "You do not install Visa.",
    body: "Visa, Mastercard, Amex, and Discover are networks. Acceptance comes with the processor account.",
  },
  {
    title: "A submitted ACH debit is not cleared funds.",
    body: "Consumer unauthorized returns can come back for about 60 days. Do not ship the expensive thing on day one.",
  },
  {
    title: "USDC in a wallet is not dollars in the bank.",
    body: "On-chain finality is seconds. Cashing out is a different clock, and the IRS treats the token as property.",
  },
]

export default function HomePage() {
  return (
    <>
      <Clearing />
      <p className="ink-sentence">
        A hold is a promise. A payout is a deposit. A return can still take the
        deposit back.
      </p>
      <FeeRuler />
      <SettlementClock />
      <section className="section">
        <div className="wrap measure prose">
          <h2>Do this first</h2>
          <p className="lede">
            Open Stripe in the LLC’s legal name, add the LLC’s bank account, and
            start with a Payment Link or hosted Checkout. That turns on cards,
            Apple Pay, and Google Pay without a separate wallet contract.
          </p>
          <p>
            Add PayPal Checkout, with Venmo enabled, only if customers already
            ask for it. Add bank debits only after you can wait out returns.
            Leave Samsung Pay, and leave mainnet USDC, until a processor confirms
            the button and an accountant has a book for tokens.
          </p>
          <p>
            <Link href="/path">The setup, in order</Link>. Then the rails:{" "}
            <Link href="/cards">cards and wallets</Link>,{" "}
            <Link href="/bank">bank payments</Link>, and{" "}
            <Link href="/crypto">USDC on Solana</Link>. Practice on the{" "}
            <Link href="/studio">studio</Link> page. Nothing there moves money.
          </p>
          <h2>Five sentences worth keeping</h2>
          <ol>
            {MYTHS.map((myth) => (
              <li key={myth.title}>
                <strong>{myth.title}</strong> {myth.body}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WalletShelf />
      <SourceDrawer />
    </>
  )
}
