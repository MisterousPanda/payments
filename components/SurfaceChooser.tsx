"use client"

import { useState } from "react"

const CHOICES = [
  {
    id: "tip",
    label: "A tip, a single product, or a link I can paste anywhere",
    title: "Payment Link",
    body: "No code. Create it in the Dashboard, in test mode first. “Customers choose what to pay” fits a tip jar. That option does not do recurring gifts.",
  },
  {
    id: "invoice",
    label: "A named client, an email, or a PDF",
    title: "Invoice",
    body: "An invoice is for a specific customer. A payment link is for anyone who has it. Invoicing adds its own percentage on top of the card fee.",
  },
  {
    id: "member",
    label: "A membership or a retainer on a schedule",
    title: "Billing",
    body: "Start from a subscription Payment Link or hosted Checkout. Billing adds a percentage, or a monthly plan, on top of the payment fee. Failed charges retry. The customer portal is part of the product.",
  },
  {
    id: "embed",
    label: "The form should sit on my own page",
    title: "Embedded Checkout",
    body: "Stripe still builds the form. You embed it. Register the domain so Apple Pay and Google Pay can show. Card numbers stay off your server.",
  },
  {
    id: "layout",
    label: "I want my own layout, and still no card numbers on my server",
    title: "Payment Element",
    body: "The most code of this list. Stripe recommends the Checkout Sessions API for it. Raw Payment Intents are more work. Do this after a Payment Link already makes sense.",
  },
] as const

export function SurfaceChooser() {
  const [id, setId] = useState<(typeof CHOICES)[number]["id"]>("tip")
  const current = CHOICES.find((choice) => choice.id === id) ?? CHOICES[0]

  return (
    <div>
      <div className="choice" role="radiogroup" aria-label="What you are collecting">
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            type="button"
            role="radio"
            aria-checked={id === choice.id}
            onClick={() => setId(choice.id)}
          >
            {choice.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        <h3 className="plaque">{current.title}</h3>
        <p>{current.body}</p>
      </div>
    </div>
  )
}
