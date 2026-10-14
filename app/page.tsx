import Link from "next/link"
import { Clearing } from "@/components/Clearing"
import { InvoiceTrio } from "@/components/InvoiceTrio"
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
  {
    title: "Venmo on a website is PayPal.",
    body: "It is a funding source on PayPal Checkout, at the domestic checkout rate, for US buyers. It is not a friends-and-family transfer, and it does not settle in Stripe.",
  },
  {
    title: "Zelle does not pass through Stripe.",
    body: "The customer pushes from a bank app to the enrolled business email, U.S. mobile number, or Zelle tag. The fee and the limit are the bank’s. A screenshot is not the deposit.",
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
          <h2>Follow a $400 consult</h2>
          <p>
            Same job, several rails. The customer is paying for an afternoon. You
            have not shipped a physical good, so the return window is easier to
            live with than it would be for a laptop.
          </p>
        </div>
        <div className="wrap">
          <InvoiceTrio />
        </div>
        <div className="wrap measure prose">
          <p>
            The card row is the one to turn on this week. Apple Pay is that same
            row, if the customer is in Safari with a card in the wallet. The bank
            row is cheaper and slower, and day 4 is not the end of the risk. The
            USDC row is cheaper than the card only if you are willing to learn a
            mint address and a second set of books. Venmo on the web is the
            PayPal column, and the $0.49 makes it cost more than the card on
            these invoices. Zelle says “Bank terms” because this page will not
            invent your bank’s fee. The{" "}
            <Link href="/path">setup page</Link> is the order of operations. The
            table above also includes a $25 tip, where the 30¢ flat fee hurts,
            and an $1,800 retainer, where the ACH cap starts to matter.
          </p>
        </div>
      </section>
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
            ask for it. Zelle is not a Stripe button. Enroll it on the LLC’s
            bank account only if that bank offers Zelle for the business
            account, and ship only after the deposit is in that account. Add
            bank debits only after you can wait out returns.
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
          <h2>Seven sentences worth keeping</h2>
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
