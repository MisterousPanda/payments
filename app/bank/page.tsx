import type { Metadata } from "next"
import Link from "next/link"
import { Ask } from "@/components/Ask"
import { BankScrubber } from "@/components/BankScrubber"

export const metadata: Metadata = {
  title: "Bank payments",
  description:
    "Plaid, Stripe Financial Connections, ACH, RTP, and FedNow for a US LLC website.",
}

export default function BankPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Bank</p>
          <h1 className="display">Verified is not settled</h1>
          <p className="deck">
            Plaid can prove an account exists. It does not, on the ordinary
            path, move the money. ACH can still come back after you have already
            delivered the work.
          </p>
          <ul className="toc">
            <li><a href="#plaid">What Plaid is</a></li>
            <li><a href="#stripe">Stripe’s linker</a></li>
            <li><a href="#rails">Five ways a bank pays</a></li>
            <li><a href="#window">The return window</a></li>
            <li><a href="#rules">What the site must keep</a></li>
          </ul>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2 id="plaid">What Plaid is</h2>
          <p>
            Plaid is a financial-data network. The product called Auth asks a
            customer to connect a checking, savings, or cash-management account
            and returns the account and routing number. Plaid’s own Auth docs say
            that to move money, Auth must be paired with a processor, and that
            Plaid does not function as the payment processor on that path.
          </p>
          <p>
            The usual sequence: the customer finishes Plaid Link, your server
            exchanges a public token for an access token, you create a processor
            token, and you hand that token to Stripe, Dwolla, Modern Treasury, or
            another originator. You do not have to store the raw account number.
            Balance, Transactions, and Identity are different products. A
            budgeting connection is not permission to debit someone.
          </p>
          <p>
            Plaid Transfer is the exception. It can originate ACH, same-day ACH,
            RTP, FedNow, and wires. It is application-gated, with a narrower set
            of allowed uses. For an ordinary LLC checkout, Auth plus a processor
            is the documented path.
          </p>

          <h2 id="stripe">If Stripe is already the processor</h2>
          <p>
            Stripe Financial Connections is Stripe’s bank-linking product, and
            Stripe’s docs say it is the default verification method for hosted
            ACH flows such as Checkout and the Payment Element. The default is
            an instant connection, with manual entry and micro-deposits as the
            fallback. Only cash accounts such as checking and savings can be
            debited. Account numbers are tokenized for use on Stripe.
          </p>
          <p>
            Plaid still documents a Stripe partnership: Link verifies the
            account, Plaid returns a one-time Stripe bank-account token, and
            Stripe moves the ACH. Stripe says a third-party verifier is allowed,
            and that you then own the mandate, the Nacha duties, and any account
            data you store. Stripe recommends Financial Connections. Use Plaid
            when the same link must feed a processor that is not Stripe, or when
            Plaid is already the system of record for account data. This
            research did not find a 2026 notice that Stripe turned Plaid tokens
            off.
          </p>
          <p>
            A separate Stripe product, Instant Bank Payments inside Link, is
            priced at 2.6% + 30¢. Stripe says it still uses ACH, confirms
            instantly, and offers settlement within two days, with Stripe taking
            liability for bank-initiated returns. It is not offered for every
            business or amount. Stripe’s API method named Pay by Bank is UK and
            European open banking, not US RTP.
          </p>

          <h2 id="rails">Five ways a bank pays</h2>
        </div>
        <div className="wrap">
          <div className="sheet-scroll">
            <table className="sheet">
              <caption className="sr-only">Bank payment rails compared</caption>
              <thead>
                <tr>
                  <th scope="col">Rail</th>
                  <th scope="col">Who starts it</th>
                  <th scope="col">Speed</th>
                  <th scope="col">Undo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">ACH debit</th>
                  <td>Your processor pulls, with the customer’s permission.</td>
                  <td>About four business days on Stripe’s standard price. Two-day costs more.</td>
                  <td>Returns. Consumer unauthorized debits can take about 60 days.</td>
                </tr>
                <tr>
                  <th scope="row">ACH credit</th>
                  <td>The customer’s bank pushes.</td>
                  <td>When it arrives. You wait.</td>
                  <td>It can reject. It is not the same consumer-debit right.</td>
                </tr>
                <tr>
                  <th scope="row">RTP</th>
                  <td>The customer’s bank pushes, after a request if you sent one.</td>
                  <td>Seconds, 24/7, if both banks are on The Clearing House network.</td>
                  <td>Final. There is no direct debit.</td>
                </tr>
                <tr>
                  <th scope="row">FedNow</th>
                  <td>The customer’s bank pushes.</td>
                  <td>Seconds, 24/7, if both banks participate. The network limit is high. A bank can set a lower one.</td>
                  <td>Final. A website cannot promise this for every US account.</td>
                </tr>
                <tr>
                  <th scope="row">Wire</th>
                  <td>The customer’s bank, on a business-day schedule.</td>
                  <td>Same day when the wire makes the cutoff. A poor fit for a checkout button.</td>
                  <td>A processed Fedwire transfer is immediate and final.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="wrap measure prose">
          <p>
            Stripe’s public US list, as reviewed October 10, 2026: ACH Direct
            Debit is 0.8% with a $5 cap for standard settlement, or 1.2% for
            two-day settlement. Instant bank-account validation is $1.50. A
            failed ACH payment is $4. An ACH dispute is $15. The $1.50 matters
            on a small charge. Plaid’s public price card was not found for this
            lesson. Treat any other processor’s ACH, RTP, or FedNow fee as a
            contract, not a number from this page.
          </p>

          <h2 id="window">The return window</h2>
          <p>
            Drag the day. The copy changes because the risk changes. Nothing is
            debited.
          </p>
          <BankScrubber />
          <p>
            Same Day ACH has three windows and a current per-payment limit of $1
            million. Nacha has approved a rise to $10 million effective September
            17, 2027. That speed does not close the unauthorized-return right.
            Some banks give Plaid a tokenized account number. Plaid says that
            token can be used for ACH and RTP, not for wires or checks, and the
            customer can revoke it. Handle a disconnect before you charge a saved
            account again.
          </p>

          <h2 id="rules">What the website has to keep</h2>
          <p>
            The LLC, or its processor acting for it, is the Nacha Originator. You
            need the customer’s permission and you need to be able to prove it.
            A consumer debit authorization should say whether the debit is
            one-time or recurring, and how to revoke it. Industry guidance says
            to keep that record for two years after the authorization ends.
            Internet consumer debits use the WEB code, which means you
            authenticate the receiver and run a commercially reasonable fraud
            check that validates the account before the first debit, and again if
            the account number changes.
          </p>
          <p>
            Instant auth means the customer signs in and you receive a verified
            account and routing number. Micro-deposits mean they type the
            numbers, small credits arrive in about one to two business days, and
            they confirm the amounts. Account validation shows that an account
            can post ACH. It does not, by itself, prove the person on the website
            owns that account. For a high-value good, compare the name on the
            order with an ownership product, and do not debit on a mismatch.
          </p>
          <p>
            Reading months of transaction history in order to take a $40 payment
            widens the data you hold. Limit the Link session to the funding
            account. The card side of this lesson is on{" "}
            <Link href="/cards">cards and wallets</Link>. The practice scrubber
            also lives in the <Link href="/studio">studio</Link>.
          </p>
          <Ask
            items={[
              {
                q: "Should I install Plaid if I only use Stripe Checkout?",
                a: "Usually no. Hosted ACH already uses Financial Connections. Add Plaid when the same bank link has to feed something that is not Stripe.",
              },
              {
                q: "Is an instant bank payment the same as FedNow?",
                a: "No. Stripe’s US Instant Bank Payments product still uses ACH, on Stripe’s description. FedNow and RTP are instant credit-push networks, and only between participating banks.",
              },
              {
                q: "Can I show a FedNow button to every customer?",
                a: "No. The sender’s bank and your receiving bank both have to participate. A checkout that promises instant bank money for every US account is overclaiming.",
              },
            ]}
          />
        </div>
      </article>
    </>
  )
}
