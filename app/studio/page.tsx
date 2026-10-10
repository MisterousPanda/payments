import type { Metadata } from "next"
import Link from "next/link"
import { BankScrubber } from "@/components/BankScrubber"
import { PayUrlLab } from "@/components/PayUrlLab"
import { WalletShelf } from "@/components/WalletShelf"

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Four short lessons for learning payments without charging a real card or touching mainnet funds.",
}

export default function StudioPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Studio</p>
          <h1 className="display">Practice without a rail</h1>
          <p className="deck">
            Four lessons. The first two run on this page. The third is homework
            in Stripe test mode, on your own machine. The fourth builds a devnet
            URL and then stops. No seed phrases. No live keys.
          </p>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2>Lesson 1. Read the shelf</h2>
          <p>
            Goal: say, out loud, what moves on each rail. Open a docket. Notice
            that Apple Pay’s “what moves” line is still a card charge, and that
            the bank docket never says Plaid deposits the money.
          </p>
        </div>
        <WalletShelf embedded />
        <div className="wrap measure prose">
          <p className="stop">
            Stop line: if a button on a real site says Pay, and you cannot point
            to the processor behind it, do not type a card number into it.
          </p>

          <h2>Lesson 2. Stay inside the return window</h2>
          <p>
            Goal: feel the difference between day 0 and day 40. Drag slowly.
            Notice that day 4 is availability, not forgiveness. The same model
            is explained on the <Link href="/bank">bank</Link> page.
          </p>
          <BankScrubber />
          <p className="stop">
            Stop line: do not ship a physical good, or release a large file,
            because an ACH status says succeeded on the afternoon you charged it.
          </p>

          <h2>Lesson 3. A tip jar in test mode</h2>
          <p>
            Goal: see a Payment Link or a hosted Checkout Session create a test
            payment. This website does not call Stripe. You do, later, with a
            test key.
          </p>
          <ol>
            <li>Create a Stripe account and stay in test mode.</li>
            <li>
              Make a Payment Link set to “customers choose what to pay,” or
              create a Checkout Session in payment mode.
            </li>
            <li>
              Pay with <span className="num">4242 4242 4242 4242</span>, any
              future date, any three-digit CVC, and any postal code.
            </li>
            <li>Find the payment in the test Dashboard. No bank was charged.</li>
          </ol>
          <p>
            If you want a few lines of server code, the shape is: create a
            Checkout Session with the test secret key, then send the browser to
            the hosted URL. The secret stays on the server.
          </p>
          <pre className="url-out">{`// Test mode only. sk_test_... never ships to the browser.
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [{
    price_data: {
      currency: "usd",
      unit_amount: 500,
      product_data: { name: "Test tip" },
    },
    quantity: 1,
  }],
  success_url: "https://example.com/thanks",
  cancel_url: "https://example.com/cancel",
});
// Redirect the browser to session.url`}</pre>
          <p className="stop">
            Stop line: do not switch on live keys, do not paste a real card, and
            do not point the page at a live bank account. Test cards do not work
            as real charges, and real cards do not belong in test mode.
          </p>

          <h2>Lesson 4. A Solana Pay string, then stop</h2>
          <p>
            Goal: see which fields make a transfer belong to one order. The
            reference changes per order. The mint is devnet USDC, not the
            mainnet mint on the <Link href="/crypto">USDC</Link> page. The
            recipient is a placeholder.
          </p>
          <PayUrlLab />
          <p>
            Homework, off this site, if you want the rest: point a devnet RPC at
            a request whose recipient is an address you generated locally, fund
            the buyer from a public devnet faucet and Circle’s testnet faucet,
            and poll for the reference until the commitment is confirmed or
            finalized. Mainnet would swap the mint, use real SOL for fees, record
            a dollar value, and wait for finalized before you fulfill. It would
            not involve pasting a seed phrase into an app.
          </p>
          <p className="stop">
            Stop line: if a prompt, a teammate, or a wallet popup asks for a seed
            phrase, close it. A reference is not a key.
          </p>
        </div>
      </article>
    </>
  )
}
