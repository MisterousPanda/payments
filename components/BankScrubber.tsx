"use client"

import { useState } from "react"

function readout(day: number): { title: string; body: string } {
  if (day === 0) {
    return {
      title: "Authorization is on file. Nothing has cleared.",
      body: "The customer agreed to a debit. “Submitted” is not money you can spend. Shipping expensive goods today is a credit decision.",
    }
  }
  if (day < 4) {
    return {
      title: `Day ${day}. The debit is in the banking-day window.`,
      body: "Many administrative returns, including insufficient funds, show up in about two banking days. A quiet day two is not a cleared payment.",
    }
  }
  if (day === 4) {
    return {
      title: "Day 4. Typical availability for standard ACH.",
      body: "Stripe’s public timing for standard ACH Direct Debit is up to four business days. The return window is still open. Two-day settlement is a different, higher fee.",
    }
  }
  return {
    title: `Day ${day}. Available, and still reversible.`,
    body: "An unauthorized debit to a consumer account can be returned so that it reaches the originating bank by the opening of business on the banking day after the 60th calendar day following settlement. Business accounts use a much shorter clock. A late return can still happen outside those timelines, at the banks’ discretion.",
  }
}

export function BankScrubber() {
  const [day, setDay] = useState(0)
  const copy = readout(day)

  return (
    <div className="lab">
      <label htmlFor="ach-day">Days after the debit is submitted</label>
      <input
        id="ach-day"
        className="scrub"
        type="range"
        min={0}
        max={60}
        step={1}
        value={day}
        onChange={(event) => setDay(Number(event.target.value))}
      />
      <p className="quiet">Day {day} of 60. This is a model, not a payout tracker.</p>
      <div className="scrub-readout" aria-live="polite">
        <p className="ink">
          <strong>{copy.title}</strong>
        </p>
        <p>{copy.body}</p>
      </div>
    </div>
  )
}
