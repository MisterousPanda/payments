import type { Metadata } from "next"
import Link from "next/link"
import { Ask } from "@/components/Ask"

export const metadata: Metadata = {
  title: "Cards and wallets",
  description:
    "How Visa, Mastercard, Amex, Apple Pay, Google Pay, Samsung Pay, Venmo, and Zelle relate to a processor account.",
}

export default function CardsPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Cards and wallets</p>
          <h1 className="display">The wallet is not the network</h1>
          <p className="deck">
            A customer pays with plastic, or with a wallet that already holds a
            card. The network asks the issuer to approve it. Your processor
            deposits what is left. You do not install Visa.
          </p>
          <ul className="toc">
            <li><a href="#stack">The stack</a></li>
            <li><a href="#apple">Apple Pay</a></li>
            <li><a href="#google">Google Pay</a></li>
            <li><a href="#samsung">Samsung Pay</a></li>
            <li><a href="#venmo">Venmo</a></li>
            <li><a href="#zelle">Zelle</a></li>
            <li><a href="#brands">The brands</a></li>
            <li><a href="#pci">Card numbers</a></li>
          </ul>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2 id="stack">The stack, in one direction</h2>
          <ol>
            <li>The customer, holding a card or a wallet.</li>
            <li>The network: Visa, Mastercard, American Express, or Discover.</li>
            <li>The issuer, which approves or declines.</li>
            <li>The processor you signed with: Stripe, Square, PayPal, Adyen.</li>
            <li>The LLC’s bank, after the payout.</li>
          </ol>
          <p>
            Apple Pay and Google Pay ride on a card that already belongs to one
            of those networks. The wallet hands the processor a token. The
            processor still clears a Visa, Mastercard, Amex, or Discover charge.
            On a blended plan you never see a separate “Visa bill.” You see 2.9%
            + 30¢, plus add-ons if the card is keyed, international, or converted.
          </p>

          <h2 id="apple">Apple Pay</h2>
          <p>
            There are two real do-it-yourself APIs: Apple Pay JS, and the Payment
            Request API. Both still need a processor to decrypt the token and
            settle. Apple’s merchant guide, current as of March 24, 2026, says
            you create a Merchant ID, a payment processing certificate that
            expires every 25 months, and a domain verification file at a
            well-known path. That path needs an Apple Developer account.
          </p>
          <p>
            The small-LLC path skips that. Apple’s same guide says a payment
            service provider may do the setup. Stripe’s docs say Payment Links
            and hosted Checkout show Apple Pay with no extra configuration.
            Stripe creates the merchant ID. Embedded forms need each domain
            registered in the Dashboard. The buyer still needs a card in Apple
            Pay, and a browser that can show the sheet. On embedded Checkout,
            Stripe documents the button on Safari 17 and iOS 17 and later.
          </p>

          <h2 id="google">Google Pay</h2>
          <p>
            Google’s own FAQ says Google Pay is not in the money flow. A direct
            integration needs HTTPS, a business profile in the Google Pay &
            Wallet Console, screenshots, and a production merchant ID. Wildcard
            domains are not accepted.
          </p>
          <p>
            The processor path is a toggle. In Stripe you turn Google Pay on in
            payment-method settings. Hosted Checkout needs no extra code. The
            page must be HTTPS. The buyer needs a card saved in Google, and a
            browser that can present it. Stripe’s US wallet price for Apple Pay
            matches the card price. Google Pay on that page adds 1% when currency
            conversion is required.
          </p>

          <h2 id="samsung">Samsung Pay, stated carefully</h2>
          <p>
            Samsung publishes a Web Checkout SDK. A shopper can confirm in
            Samsung Wallet, including by QR from a desktop. That SDK requires
            Samsung partner onboarding, a service ID, a gateway that can take the
            token, and a registered domain. It is a partner product.
          </p>
          <p>
            What this research could not find is a one-toggle US website button
            next to Apple Pay and Google Pay. Square’s web docs list cards,
            Apple Pay, and Google Pay, not Samsung Pay. Stripe’s Samsung Pay
            guide is a South Korean local method. A Galaxy user can still pay if
            that same card is in Google Pay, or if they type the number. Leave
            Samsung Pay off unless a processor confirms a US web button in
            writing.
          </p>

          <h2 id="venmo">Venmo is two products</h2>
          <p>
            On a website, use PayPal Checkout. PayPal’s developer guide, updated
            September 14, 2026, says you add <span className="num">enable-funding=venmo</span> to
            the JavaScript SDK. Venmo is off unless you add that. Buyers need the
            Venmo app. On a phone, Safari on iOS or Chrome on Android. On a
            desktop, the phone approves the payment. Currency is USD. PayPal’s
            business page lists a standard domestic rate of 3.49% + $0.49, with
            no monthly fee. The buyer can pay from a Venmo balance, a bank, or a
            card stored in Venmo.
          </p>
          <p>
            Venmo business profiles are the in-person and in-app product. An LLC
            can use one. The profile is tied to an existing personal Venmo login,
            and Venmo says you manage it in the app. Fees on Venmo’s own page are
            about 1.9% + 10¢ for a direct or QR payment, and about 2.9% + 9¢ for
            Tap to Pay. Those are goods-and-services payments. A personal
            friends-and-family account used for sales can be limited. PayPal’s
            footnote says a Venmo Balance account is required to hold a balance,
            effective November 1, 2026.
          </p>

          <h2 id="zelle">Zelle is not a wallet button</h2>
          <p>
            Zelle does not sit next to Apple Pay in Checkout. The customer
            sends from a bank app to an email, a U.S. mobile number, or a Zelle
            tag enrolled on the LLC’s account. The picture, the fee, and the
            limit are on the <Link href="/bank">bank</Link> page. Use it when
            customers already pay that way. Do not point a personal Zelle
            enrollment at business revenue.
          </p>

          <h2 id="brands">Visa, Mastercard, American Express</h2>
          <p>
            Once the processor approves the LLC, domestic Visa and Mastercard
            acceptance is part of that account. Discover usually comes along.
            You show the marks of the brands you actually accept. You do not
            store the full number, the security code, or stripe data from the
            card.
          </p>
          <p>
            American Express has two US programs. OptBlue, on Amex’s page, is for
            a US business with estimated annual Amex charge volume under $3
            million: you accept Amex through the processor you already have, on
            that processor’s rate, with one statement and one deposit. Some
            industries are excluded or have no cap. Above the line, or if you
            want a direct contract, you call Amex, and Amex sets the rate and
            pays Amex funds itself.
          </p>
          <p>
            Interchange is the fee between the merchant’s bank and the
            cardholder’s bank. It is not the number on a blended statement. The
            number you plan around, on Stripe’s public US price, is 2.9% + 30¢.
            An interchange-plus contract shows the network’s fee and the
            processor’s markup as separate lines. That is a different deal.
          </p>

          <h2 id="pci">Where the card number is allowed to go</h2>
          <p>
            PCI DSS applies because you accept cards, even when a processor hosts
            the form. The small-merchant questionnaire for a fully outsourced
            page is SAQ A: the customer is sent to the processor, or the card
            fields are that processor’s iframe, and you do not store, process, or
            transmit the card number. Since April 1, 2025, an iframe merchant
            also has to be able to say the page is not open to scripts that could
            touch card data. A form you build, where the number hits your server,
            is outside SAQ A. Don’t do that to learn.
          </p>
          <p>
            Surcharges, if you ever add one, are a card-brand rule. Visa says to
            tell your acquirer before you start. The easy version of this whole
            page is still the one in <Link href="/path">setup</Link>: one
            processor, hosted fields, Apple Pay and Google Pay on, Venmo only as
            a second button.
          </p>
          <Ask
            items={[
              {
                q: "Is Link the same as Apple Pay?",
                a: "No. Link is Stripe’s own saved-payment wallet. Turn it on in the Dashboard. A Link card payment is priced like a card payment. There is no separate Link fee on Checkout.",
              },
              {
                q: "Why is Samsung Pay missing from the recommendation?",
                a: "Because a US LLC website does not get it by flipping a Stripe or Square switch. The direct web SDK is a Samsung partner integration. The card inside the Samsung phone can still ride Google Pay or a typed checkout.",
              },
              {
                q: "Should the site have both Stripe and PayPal?",
                a: "Stripe covers cards, Apple Pay, and Google Pay. PayPal Checkout is the way Venmo appears on the web. Two buttons is reasonable. Three processors is how reconciliation gets worse than the fee you saved.",
              },
            ]}
          />
        </div>
      </article>
    </>
  )
}
