"use client"

import { useState } from "react"
import { dollarsToCents, moneyFromCents, quote } from "@/lib/fees"

const priced = quote(dollarsToCents(40))

const COLUMNS = [
  {
    title: "Card",
    fee: moneyFromCents(priced.cardCents),
    wait: "Often about two business days in the Stripe balance, then a free standard payout.",
    hold: "The mug can sit on the shelf while the charge settles. A dispute can still arrive later.",
    ship: "Shipping a $40 mug on a captured card is ordinary. You can replace it if the dispute arrives.",
  },
  {
    title: "ACH",
    fee: moneyFromCents(priced.achCents),
    wait: "About four business days on standard ACH. The fee is 0.8%, under the $5 cap.",
    hold: "The mug stays on the shelf. “Submitted” is not cleared funds.",
    ship: "Shipping today is reckless. A consumer’s unauthorized debit can come back for about 60 days.",
  },
  {
    title: "Venmo",
    fee: moneyFromCents(priced.venmoCents),
    wait: "Approved in the Venmo app, then held in PayPal. The bank payout is a later PayPal step.",
    hold: "The mug stays until the PayPal balance shows the payment. A screenshot of the app is not that balance.",
    ship: "Shipping after the payment is in PayPal is ordinary for a $40 mug. A PayPal dispute is still possible.",
  },
  {
    title: "Zelle",
    fee: "Bank terms",
    wait: "Typically minutes into the business account, if both sides are enrolled.",
    hold: "The mug stays until the business account shows the deposit. A text screenshot is not the deposit.",
    ship: "Shipping after the deposit is visible is the calm case. There is generally no purchase protection to lean on.",
  },
  {
    title: "USDC",
    fee: moneyFromCents(priced.usdcCents),
    wait: "Confirmed, then finalized about 13 seconds later, if you keep the token.",
    hold: "Wait for finalized before you treat it as received. There is no chargeback desk.",
    ship: "Shipping after finalized is the calm case. A refund is a new transfer you send on purpose.",
  },
] as const

export function ShipMug() {
  const [shipped, setShipped] = useState(false)

  return (
    <div className="lab">
      <p>
        <strong>Model.</strong> A $40 mug. The dates are written on the page.
        Nothing is fetched.
      </p>
      <button
        className="ghost"
        type="button"
        aria-pressed={shipped}
        onClick={() => setShipped((value) => !value)}
      >
        {shipped ? "Put the mug back on the shelf" : "Ship the $40 mug"}
      </button>
      <div className="clocks">
        {COLUMNS.map((column) => (
          <article key={column.title} className="day">
            <strong>{column.title}</strong>
            <span>Fee on this model: {column.fee}</span>
            <span>{column.wait}</span>
            <span>{shipped ? column.ship : column.hold}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
