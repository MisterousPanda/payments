"use client"

import { useEffect, useId, useRef, useState } from "react"

const DOCKETS = [
  {
    id: "card",
    index: "01",
    title: "Card",
    lines: [
      ["Payer uses", "Card credentials, typed into a processor-hosted field."],
      ["What moves", "A card charge on Visa, Mastercard, Amex, or Discover."],
      ["When it lands", "About two business days after capture, for a US card."],
      ["What can undo it", "A later dispute. Winning is not guaranteed."],
      ["Fee on this page", "2.9% + $0.30 on standard US pricing."],
    ],
  },
  {
    id: "apple",
    index: "02",
    title: "Apple Pay",
    lines: [
      ["Payer uses", "A device token, usually with Face ID or Touch ID."],
      ["What moves", "A card charge under that token. Same networks."],
      ["When it lands", "The same clock as a typed card."],
      ["What can undo it", "The same dispute rights as the underlying card."],
      ["Fee on this page", "The same schedule as card, on Stripe’s US list."],
    ],
  },
  {
    id: "bank",
    index: "03",
    title: "Bank",
    lines: [
      ["Payer uses", "A bank login, or typed account numbers plus micro-deposits."],
      ["What moves", "An ACH debit. Plaid or Financial Connections only checks the account."],
      ["When it lands", "About four business days on standard ACH Direct Debit."],
      ["What can undo it", "An ACH return. Unauthorized consumer debits can take weeks."],
      ["Fee on this page", "0.8% up to $5 on Stripe’s public US list."],
    ],
  },
  {
    id: "venmo",
    index: "04",
    title: "Venmo",
    lines: [
      ["Payer uses", "The Venmo app. On a phone, Safari or Chrome. On a desktop, the phone approves."],
      ["What moves", "A PayPal Checkout payment with Venmo as the funding source. US buyers, USD."],
      ["When it lands", "In PayPal, not in Stripe. The bank payout is a separate PayPal step."],
      ["What can undo it", "PayPal’s dispute process for goods and services, not a friends-and-family transfer."],
      ["Fee on this page", "3.49% + $0.49 for standard domestic checkout. The in-app business profile is a different rate."],
    ],
  },
  {
    id: "zelle",
    index: "05",
    title: "Zelle",
    lines: [
      ["Payer uses", "Their own bank app, sending to your enrolled email, U.S. mobile number, or Zelle tag."],
      ["What moves", "A push into the business account. You do not pull it, and Stripe is not in the middle."],
      ["When it lands", "Typically minutes, if both sides are enrolled and the bank offers Zelle on that account."],
      ["What can undo it", "Not a card dispute and not an ACH return. Purchase protection is generally not included."],
      ["Fee on this page", "None listed. Zelle says the business fee depends on the bank. Ask before you enroll."],
    ],
  },
  {
    id: "usdc",
    index: "06",
    title: "USDC",
    lines: [
      ["Payer uses", "A USDC wallet and a little SOL for the network fee."],
      ["What moves", "USDC on Solana, if you accept the native mint."],
      ["When it lands", "Seconds on Solana, if the LLC keeps the USDC."],
      ["What can undo it", "A wrong address, which is not reversible."],
      ["Fee on this page", "1.5% if Stripe settles it. A self-custody transfer is different."],
    ],
  },
] as const

export function WalletShelf({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState<string | null>(null)
  const baseId = useId()
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (!open) return
    const current = open
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setOpen(null)
      buttons.current[current]?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const shelf = (
        <div className="shelf">
          {DOCKETS.map((docket) => {
            const expanded = open === docket.id
            const panelId = `${baseId}-${docket.id}`
            return (
              <article key={docket.id} className={expanded ? "docket open" : "docket"}>
                <button
                  ref={(node) => {
                    buttons.current[docket.id] = node
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  aria-label={`Read the ${docket.title} rail`}
                  onClick={() => setOpen(expanded ? null : docket.id)}
                >
                  <span className="index">
                    <i className="brass-tab" aria-hidden="true" />
                    {docket.index}
                  </span>
                  <h3>{docket.title}</h3>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-label={docket.title}
                  className={expanded ? "panel-grid open" : "panel-grid"}
                  aria-hidden={!expanded}
                  inert={!expanded ? true : undefined}
                >
                  <div className="panel-inner">
                    <dl className="panel-body">
                      {docket.lines.map(([term, detail]) => (
                        <div key={term}>
                          <dt>{term}</dt>
                          <dd>{detail}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="quiet panel-body">Demo copy. Nothing is linked.</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
  )

  if (embedded) {
    return <div className="wrap">{shelf}</div>
  }

  return (
    <section className="section" aria-labelledby="shelf-title">
      <div className="wrap">
        <div className="measure">
          <h2 id="shelf-title">Open a docket</h2>
          <p>
            Each rail is a different promise. The fee line is the public US
            figure used on this site, not a contract.
          </p>
        </div>
        {shelf}
      </div>
    </section>
  )
}
