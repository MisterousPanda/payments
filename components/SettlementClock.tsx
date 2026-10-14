"use client"

import { useState } from "react"
import { RAILS, type RailId } from "@/lib/rails"
import { RailToggle } from "@/components/RailToggle"

export function SettlementClock() {
  const [rail, setRail] = useState<RailId>("card")
  const current = RAILS.find((item) => item.id === rail) ?? RAILS[0]
  const cardLike = rail === "card" || rail === "apple"

  return (
    <section className="section ink-band" aria-labelledby="clock-title">
      <div className="wrap">
        <h2 id="clock-title">When it is available</h2>
        <RailToggle
          className="rail-toggle"
          label="Timing for"
          value={rail}
          options={RAILS.map((item) => ({ id: item.id, label: item.label }))}
          onChange={(id) => setRail(id as RailId)}
        />
        <div className="clock">
          {rail === "usdc" ? (
            <p className="final-mark">
              <i className="lock" aria-hidden="true" />
              <span>Final · seconds</span>
            </p>
          ) : null}
          {rail === "zelle" ? (
            <p className="final-mark">
              <span>Minutes · in the bank</span>
            </p>
          ) : null}
          <div className="clock-rail" aria-hidden="true">
            <i className="tick" style={{ left: "8%" }}>
              <span>T+0</span>
            </i>
            <i className="tick" style={{ left: "36%" }}>
              <span>T+2</span>
            </i>
            <i className="tick" style={{ left: "64%" }}>
              <span>T+4</span>
            </i>
            <i className="tick" style={{ left: "92%" }}>
              <span>Returns</span>
            </i>
            {cardLike ? (
              <>
                <i className="mark hollow" style={{ left: "8%" }} />
                <i className="mark solid" style={{ left: "36%" }} />
              </>
            ) : null}
            {rail === "bank" ? (
              <>
                <i className="mark solid" style={{ left: "64%" }} />
                <i className="return-dash" style={{ left: "64%", width: "28%" }} />
              </>
            ) : null}
            {rail === "usdc" ? <i className="mark solid" style={{ left: "0%" }} /> : null}
            {rail === "venmo" ? <i className="mark solid" style={{ left: "8%" }} /> : null}
            {rail === "zelle" ? <i className="mark solid" style={{ left: "8%" }} /> : null}
          </div>
          <div className="clock-copy" aria-live="polite">
            {cardLike ? (
              <p>
                T+0 is the authorization, a hold the payer’s bank agrees to.
                T+2 is when a typical established US card charge becomes
                available in Stripe.
              </p>
            ) : null}
            {rail === "bank" ? (
              <p>
                T+4 is a typical standard ACH debit, after the account check is
                already done. The dashed stretch is the return window, not a
                second deposit.
              </p>
            ) : null}
            {rail === "usdc" ? (
              <p>
                The business-day ticks stay on the rail so you can see what this
                is not. Finality for USDC the LLC keeps is seconds, on Solana.
              </p>
            ) : null}
            {rail === "venmo" ? (
              <p>
                T+0 is the buyer approving in the Venmo app. The money is in
                PayPal, not in Stripe. A payout from PayPal to the LLC bank is
                a later step, and this clock does not time it.
              </p>
            ) : null}
            {rail === "zelle" ? (
              <p>
                The business-day ticks stay up so you can see what this is not.
                Enrolled Zelle transfers typically arrive in minutes, in the
                business account. Confirm that deposit. A screenshot is not it.
              </p>
            ) : null}
            <p>{current.clockNote}</p>
            <p className="quiet" style={{ color: "inherit" }}>
              A calendar of typical availability. Not a tracker for a real payout.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
