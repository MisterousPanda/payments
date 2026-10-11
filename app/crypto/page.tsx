import type { Metadata } from "next"
import Link from "next/link"
import { Ask } from "@/components/Ask"

export const metadata: Metadata = {
  title: "USDC",
  description:
    "How a US LLC can think about Solana USDC: native mint, Solana Pay, processors, and what not to do.",
}

export default function CryptoPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">USDC</p>
          <h1 className="display">Final on the rail, not in the bank</h1>
          <p className="deck">
            A card payment is an authorization that can still be disputed. A
            USDC payment is a token transfer. Seconds later it can be final, and
            a wrong address is a new problem, not a chargeback.
          </p>
          <ul className="toc">
            <li><a href="#changes">What changes</a></li>
            <li><a href="#mint">The mint</a></li>
            <li><a href="#ways">Three ways to accept it</a></li>
            <li><a href="#books">Books and the law</a></li>
            <li><a href="#dont">What not to do</a></li>
          </ul>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2 id="changes">What changes versus a card</h2>
          <p>
            The customer signs a Solana transaction that moves USDC into a wallet
            the LLC controls, or into a processor that then credits the LLC.
            Wallets often show a payment in about a second. Solana’s stronger
            lock, called finalized, sits about 32 slots, roughly 13 seconds,
            behind the confirmed commitment under normal conditions. Ship goods
            after the commitment level you chose. For anything you cannot
            reverse, wait for finalized.
          </p>
          <p>
            The protocol base fee is 5,000 lamports per signature, which is
            0.000005 SOL. In practice the fee is a fraction of a cent, plus an
            optional priority fee when the network is busy. The first time a
            wallet receives USDC, someone creates its token account. That rent
            deposit is separate from the transfer fee, on the order of a fraction
            of a SOL. There is no card chargeback. Refunds are a second transfer
            you send.
          </p>

          <h2 id="mint">Accept one mint</h2>
          <p>
            USDC is a dollar-pegged stablecoin issued by Circle. Circle describes
            it as backed by cash and cash equivalents and redeemable 1:1 for
            dollars. It is not a bank deposit, and the peg is not a government
            guarantee. Merchants price in USDC because the invoice stays near a
            dollar. An invoice priced in SOL can be wrong by the time it
            confirms.
          </p>
          <div className="preview">
            <p>
              <strong>Native Solana USDC.</strong> Accept this mint only.
            </p>
            <p className="num">EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</p>
            <p>
              Bridged USDC is a different token, created by a third party and
              backed by USDC locked on another chain. Circle says bridged
              versions are not issued by Circle and are not accepted by Circle
              Mint. Sending the wrong token to a mint address can be
              unrecoverable.
            </p>
          </div>
          <p>
            Turning USDC into bank dollars is a separate step. Qualified
            businesses can redeem 1:1 in Circle Mint. Everyone else uses an
            exchange or another off-ramp. Either way the sale is still
            bookkeeping.
          </p>

          <h2 id="ways">Three ways a small site accepts it</h2>
          <p>
            <strong>Solana Pay, as a pattern.</strong> A transfer request is a{" "}
            <span className="num">solana:</span> URL. The wallet builds a
            transfer from the recipient, the amount, the <span className="num">spl-token</span> mint,
            a unique reference address, and an optional memo. You watch the chain
            for that reference and check the mint and the amount before you
            fulfill the order. The spec is still published. A Solana Foundation
            comment on March 6, 2025 said the protocol was not deprecated and not
            under active development, and that major wallets still handled the
            requests. Later comments described flaky QR scans. Teach it as a
            pattern. The <Link href="/studio">studio</Link> builds the string and
            stops there.
          </p>
          <p>
            <strong>A processor that settles dollars or USDC.</strong> You give
            up a fee and you gain a payout, screening, and a refund path that is
            someone else’s job to operate.
          </p>
        </div>
        <div className="wrap">
          <div className="sheet-scroll">
            <table className="sheet">
              <caption className="sr-only">
                Processors checked against their own pages in October 2026
              </caption>
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Solana USDC</th>
                  <th scope="col">What you receive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Stripe stablecoin payments</th>
                  <td>Yes. USDC on Solana is listed, with other chains.</td>
                  <td>
                    Stripe balance in your local currency. Public price 1.5%,
                    with a 0.8% promo through January 1, 2027. Confirm the live
                    rate in the dashboard. Customer limit $10,000 per transaction.
                    Refunds go back as stablecoins.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Coinbase Business</th>
                  <td>Not confirmed for checkout. The fetched network list showed Base.</td>
                  <td>
                    Commerce’s self-custody portal was set to close March 31,
                    2026. Do not plan a Solana button on an old Commerce snippet.
                  </td>
                </tr>
                <tr>
                  <th scope="row">MoonPay Commerce</th>
                  <td>Yes. The help center lists Solana and USDC. This is the Helio product.</td>
                  <td>
                    Marketing says crypto, stablecoins, or auto-convert to USD,
                    EUR, or GBP where supported. A public percentage was not found.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Loop</th>
                  <td>Yes, including SPL tokens such as USDC.</td>
                  <td>
                    Crypto payout keeps USDC in your wallet. Fiat payout, after
                    KYB, pays USD.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="wrap measure prose">
          <p>
            <strong>Self-custody.</strong> Publish a Solana Pay request for a
            fixed amount, with a unique reference, to an address you control. You
            skip the processor fee. You also inherit the wrong mint, the wrong
            network, key loss, and the bookkeeping. Customers need a little SOL
            for fees unless someone sponsors gas. Do not keep a large treasury
            in a hot wallet that the website server can sign with.
          </p>

          <h2 id="books">Books, tax, and a bright line</h2>
          <p>
            The IRS treats digital assets as property, not currency. Receiving
            USDC for a sale is generally income at its fair market value in
            dollars at that time. Converting or spending it later is another
            disposition. Some brokers and processors report on Form 1099-DA for
            transactions on or after January 1, 2025. An accountant should set
            the books up before the first real payment. This is not tax advice.
          </p>
          <p>
            This is not legal advice either. Accepting USDC as payment for the
            LLC’s own goods is a different activity from transmitting other
            people’s money or running an exchange. FinCEN has treated convertible
            virtual-currency payment processors as money transmitters in general.
            State licenses can apply even when a federal exemption seems to.
            OFAC’s FAQ 560 says sanctions duties are the same for digital
            currency as for dollars. Talk to an attorney before mainnet receipts.
            Nothing on this site is a method for avoiding sanctions.
          </p>

          <h2 id="dont">What not to do</h2>
          <ul>
            <li>Do not ask a customer to send SOL to a bare address with no amount check.</li>
            <li>Do not treat “the wallet said success” as finalized if you cannot reverse the order.</li>
            <li>Do not accept a bridged lookalike because the logo says USDC.</li>
            <li>Do not paste a seed phrase into a website, a chat, or a vibe-coding prompt.</li>
            <li>
              Do not skip the ledger line: date, signature, mint, amount, dollar
              value, order id.
            </li>
          </ul>
          <p>
            Devnet USDC, for the studio exercise only, uses mint{" "}
            <span className="num">4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU</span>.
            Circle states that testnet USDC has no dollar backing and no financial
            value. The card and bank clocks are on the{" "}
            <Link href="/">front page</Link>.
          </p>
          <Ask
            items={[
              {
                q: "Is 1.5% the same product as keeping USDC yourself?",
                a: "No. Stripe’s 1.5% is the price of settling into a Stripe balance, in local currency, with their screening. A self-custody transfer does not include that fee or that payout. It also does not include their support.",
              },
              {
                q: "Can I price the invoice in SOL?",
                a: "You can. The amount can be wrong by the time the transaction confirms. USDC keeps the invoice near a dollar. You still record a dollar value for the books.",
              },
              {
                q: "Does finality mean I can spend dollars the same day?",
                a: "Only if you are spending the USDC itself, or you already have an off-ramp that will credit the bank. Cashing out is a different clock and is not drawn on the settlement diagram.",
              },
            ]}
          />
        </div>
      </article>
    </>
  )
}
