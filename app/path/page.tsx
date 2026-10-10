import type { Metadata } from "next"
import Link from "next/link"
import { Ask } from "@/components/Ask"
import { DescriptorLab } from "@/components/DescriptorLab"
import { InvoiceTrio } from "@/components/InvoiceTrio"
import { SurfaceChooser } from "@/components/SurfaceChooser"

export const metadata: Metadata = {
  title: "Setup",
  description:
    "The first path for a US LLC: Stripe in the company’s legal name, a bank account, and a Payment Link or hosted Checkout.",
}

export default function PathPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Setup</p>
          <h1 className="display">One account, then a link</h1>
          <p className="deck">
            Stripe is the processor, not the LLC’s bank. The practical first
            surface is a Payment Link or hosted Checkout. Cards, Apple Pay, and
            Google Pay come with that. The rest can wait.
          </p>
          <ul className="toc">
            <li><a href="#order">The order</a></li>
            <li><a href="#week">A week</a></li>
            <li><a href="#surface">Which surface</a></li>
            <li><a href="#descriptor">The statement line</a></li>
            <li><a href="#outside">Outside Stripe</a></li>
            <li><a href="#pitfalls">Pitfalls</a></li>
          </ul>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2 id="order">The order</h2>
          <p>
            Money moves from the customer, through a card or wallet network, into
            a Stripe balance, and then out as a payout to the bank account you
            added. For a US card, Stripe’s own example is a Monday payment that
            becomes available on Wednesday. The payout schedule decides when that
            available balance leaves Stripe. Standard payouts are free. Instant
            Payouts are optional, 1.5% with a 50¢ minimum, and new accounts are
            not eligible on day one.
          </p>
          <ol>
            <li>
              Know which tax ID the LLC actually uses. A single-member LLC on an
              SSN is checked as the owner. An entity that uses an EIN is checked
              under that EIN. This page will not choose for you.
            </li>
            <li>
              Open the bank account in a name Stripe can match to that legal
              record. A mismatched personal account is a common way for payouts
              to fail.
            </li>
            <li>
              Create the Stripe account in the LLC’s legal name. The name has to
              match IRS records exactly.
            </li>
            <li>
              If you use an EIN, upload an IRS confirmation: Letter 147C, an SS-4
              confirmation, an IRS fax, or an EIN Assistance Letter. The SS-4
              application itself is not enough.
            </li>
            <li>
              Add every owner at 25% or more, and a government photo ID. A person
              who lives in a different country from the account is asked for a
              passport.
            </li>
            <li>
              Add the bank account. If Stripe cannot verify it, you may see two
              small deposits labeled ACCTVERIFY, one to two business days later.
              A wrong account number can send money somewhere you cannot get back.
            </li>
            <li>
              Set the statement descriptor, then the payout schedule: manual,
              every business day, weekly, or monthly. Weekends and holidays move
              to the next business day.
            </li>
            <li>
              Make the first charge in test mode. The studio lesson uses the test
              card <span className="num">4242 4242 4242 4242</span>. Live mode is
              a separate decision.
            </li>
          </ol>

          <h2 id="week">A Monday charge, told plainly</h2>
          <p>
            Availability and payout are different clocks. This is a typical
            established US account, not a promise about a new one. Verification
            can pause both charges and payouts.
          </p>
        </div>
        <div className="wrap">
          <div className="week" aria-hidden="true">
            <div className="day">
              <strong>Mon</strong>
              <span>Card captured. ACH, if you offered it, is only submitted.</span>
            </div>
            <div className="day">
              <strong>Tue</strong>
              <span>Card funds still pending. ACH can already be returned for insufficient funds.</span>
            </div>
            <div className="day">
              <strong>Wed</strong>
              <span>Card funds often available in Stripe. The bank deposit waits for the payout run.</span>
            </div>
            <div className="day">
              <strong>Thu</strong>
              <span>A daily payout of Wednesday’s card balance may arrive. New accounts are slower.</span>
            </div>
            <div className="day">
              <strong>Fri</strong>
              <span>Standard ACH from Monday may become available. The return window is still open.</span>
            </div>
          </div>
        </div>
        <div className="wrap measure prose">
          <h2 id="surface">Which surface</h2>
          <p>
            All of these are Stripe. The card fee still applies. Invoicing and
            Billing add their own price on top. Pick the least machinery that
            matches the sale.
          </p>
          <SurfaceChooser />

          <h2>Three invoices</h2>
          <p>
            Same public rates as the ruler on the front page. Card is 2.9% +
            30¢, ACH is 0.8% capped at $5, USDC via Stripe is 1.5%. Rounded to
            the cent.
          </p>
          <InvoiceTrio />
          <p>
            On the $25 tip, the 30¢ flat fee is doing most of the damage. On the
            $1,800 retainer, ACH’s $5 cap is the quiet win, if you can stand the
            return window. USDC via Stripe beats the card on all three and still
            costs more than capped ACH on the retainer.
          </p>

          <h2 id="descriptor">The line on the statement</h2>
          <p>
            Customers dispute charges they do not recognize. The descriptor is
            the text on the card statement. Stripe’s rules: 5 to 22 characters,
            at least one letter, Latin characters, and none of these: {"< > \\ ' \" *"}.
            A short prefix can be 2 to 10 characters, with a suffix per charge.
          </p>
          <DescriptorLab />

          <h2 id="outside">What Stripe does not finish</h2>
          <ul>
            <li>
              Sales tax. You register where the law says you must. Stripe Tax can
              calculate after you add registrations. With no registration it
              calculates zero. Filing is a separate choice. Thresholds are not on
              this page.
            </li>
            <li>
              Books. The Dashboard is a list of payments and payouts. It is not a
              general ledger. Keep the LLC’s money out of a personal account.
            </li>
            <li>
              Refunds. You can issue them. Stripe does not give back the original
              processing fee on a standard refund.
            </li>
            <li>
              Card data. Hosted Checkout, embedded Checkout, and the Payment
              Element keep the card number off your server. You still complete a
              self-assessment once a year. Do not store a full card number. Do
              not put a secret key in frontend code. Live pages need HTTPS.
            </li>
          </ul>

          <h2 id="pitfalls">Four ways this goes wrong</h2>
          <ul>
            <li>
              <strong>The name does not match.</strong> Legal name, tax ID, and
              bank account tell three different stories. Payouts pause, or land
              in the wrong place.
            </li>
            <li>
              <strong>The descriptor is cute.</strong> A random string produces
              “I don’t recognize this” disputes. Networks count disputes even
              when you win them. A spike can restrict processing. Stripe’s{" "}
              <a href="https://docs.stripe.com/disputes/measuring">
                dispute measuring guide
              </a>{" "}
              has the current thresholds.
            </li>
            <li>
              <strong>You wait for a dispute instead of refunding.</strong> If
              the order is wrong, refund it. Fighting a dispute has its own fees,
              including $15 when a dispute is received.
            </li>
            <li>
              <strong>You plan on instant money.</strong> The first payouts follow
              the slower clock. Unfinished verification can hold a reserve.
            </li>
          </ul>
          <p>
            The practice version of the first link is in the{" "}
            <Link href="/studio">studio</Link>. It stays in test mode on purpose.
          </p>
          <Ask
            items={[
              {
                q: "Do I need an Apple Developer account?",
                a: "Not for Payment Links or hosted Checkout. Stripe creates the Apple merchant ID. You need your own Apple account, certificate, and domain file only if you build Apple Pay yourself.",
              },
              {
                q: "Does Amex cost extra on this price?",
                a: "Not on Stripe’s public US blend. Domestic Visa, Mastercard, Amex, and Discover are inside 2.9% + 30¢. The networks’ own interchange still differs. That difference is Stripe’s cost on this plan, not a second line on your statement.",
              },
              {
                q: "Can I skip the bank account and use a personal one?",
                a: "Payouts follow the account numbers you type, and the name has to match the account Stripe verified. Mixing the LLC and a personal account is how both the books and the payout break.",
              },
            ]}
          />
        </div>
      </article>
    </>
  )
}
