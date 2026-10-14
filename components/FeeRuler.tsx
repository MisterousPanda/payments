"use client"

import { useId, useState } from "react"
import {
  ACH_CAP_DOLLARS,
  dollarsToCents,
  keepCents,
  moneyFromCents,
  percentOf,
  quote,
} from "@/lib/fees"
import { RailToggle } from "@/components/RailToggle"

const SAMPLES = [
  { id: "100", label: "$100 sample" },
  { id: "2000", label: "$2,000 sample" },
  { id: "other", label: "Other amount" },
]

export function FeeRuler() {
  const [sample, setSample] = useState("100")
  const [custom, setCustom] = useState("400")
  const [keyed, setKeyed] = useState(false)
  const [international, setInternational] = useState(false)
  const customId = useId()

  const dollars =
    sample === "100" ? 100 : sample === "2000" ? 2000 : Number(custom)
  const valid = Number.isFinite(dollars) && dollars >= 1 && dollars <= 20000
  const priced = quote(valid ? dollarsToCents(dollars) : 0, {
    keyed,
    international,
  })
  const card = priced.cardCents
  const rows: Array<{
    name: string
    fee: number | null
    note: string
    brass: boolean
    tooth: boolean
  }> = [
    {
      name: "Card",
      fee: priced.cardCents,
      note: keyed || international ? "Card price plus the add-ons below." : "$0.30 flat, then 2.9%.",
      brass: true,
      tooth: false,
    },
    {
      name: "ACH",
      fee: priced.achCents,
      note: priced.achCapped ? "Cap $5." : "0.8%.",
      brass: false,
      tooth: priced.achCapped,
    },
    {
      name: "USDC via Stripe",
      fee: priced.usdcCents,
      note: "1.5%.",
      brass: false,
      tooth: false,
    },
    {
      name: "Venmo",
      fee: priced.venmoCents,
      note: "3.49% + $0.49. PayPal Checkout, US buyers.",
      brass: false,
      tooth: false,
    },
    {
      name: "Zelle",
      fee: null,
      note: "Your bank sets the fee and the limit. Often no Zelle fee. Not priced here.",
      brass: false,
      tooth: false,
    },
  ]
  const maxFee = Math.max(card, priced.venmoCents, 1)

  return (
    <section className="section" aria-labelledby="fee-title">
      <div className="wrap">
        <div className="fee-head measure">
          <h2 id="fee-title">What a sample charge costs</h2>
          <p>
            Illustrative. Card is 2.9% + $0.30. ACH is 0.8% up to $5. USDC via
            Stripe is 1.5%. Venmo on the web is PayPal’s 3.49% + $0.49. Zelle
            is not a processor price.
          </p>
        </div>
        <RailToggle
          label="Sample charge"
          value={sample}
          options={SAMPLES}
          onChange={setSample}
        />
        {sample === "other" ? (
          <div className="field">
            <label htmlFor={customId}>Amount in dollars, from 1 to 20,000</label>
            <input
              id={customId}
              type="number"
              min={1}
              max={20000}
              step="0.01"
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
            />
          </div>
        ) : null}
        <p className="quiet">The ACH cap binds at $625. Above that, the ACH fee stays $5.</p>
        <div className="fee-scale" aria-hidden="true">
          <span className="scale-start" style={{ left: "0%" }}>
            $0
          </span>
          <i style={{ left: `${(ACH_CAP_DOLLARS / 2000) * 100}%` }} />
          <span style={{ left: `${(ACH_CAP_DOLLARS / 2000) * 100}%` }}>$625</span>
          <span className="scale-end" style={{ left: "100%" }}>
            $2,000
          </span>
        </div>
        {rows.map((row) => {
          const scale = row.fee != null && maxFee > 0 ? row.fee / maxFee : 0
          return (
            <div className="fee-row" key={row.name}>
              <div className="fee-name">{row.name}</div>
              <div>
                <div className="fee-track" aria-hidden="true">
                  {row.fee != null ? (
                    <div
                      className="fee-bar"
                      style={{ transform: `scaleX(${Math.min(1, scale)})` }}
                    />
                  ) : null}
                  {row.brass && card > 0 ? (
                    <div
                      className="fee-brass"
                      style={{
                        width: `${Math.max((30 / maxFee) * 100, 0.8)}%`,
                      }}
                    />
                  ) : null}
                  {row.tooth && row.fee != null ? (
                    <div
                      className="fee-tooth"
                      style={{ left: `calc(${scale * 100}% - 1px)` }}
                    />
                  ) : null}
                </div>
                <span className="fee-note">{row.note}</span>
              </div>
              <div className="fee-figure" key={`${row.name}-${priced.amountCents}-${keyed}-${international}`}>
                <strong>
                  {row.fee == null ? "Bank terms" : valid ? moneyFromCents(row.fee) : "—"}
                </strong>
                <span>
                  {row.fee == null
                    ? "No list price on this page"
                    : valid
                      ? `${percentOf(row.fee, priced.amountCents)} of the charge`
                      : "—"}
                </span>
                <span className="fee-keep">
                  {row.fee == null
                    ? "Confirm the deposit in the business account."
                    : valid
                      ? `You keep ${moneyFromCents(keepCents(priced.amountCents, row.fee))}`
                      : "Enter an amount from $1 to $20,000."}
                </span>
              </div>
            </div>
          )
        })}
        <div className="addons">
          <label>
            <input
              type="checkbox"
              checked={keyed}
              onChange={(event) => setKeyed(event.target.checked)}
            />
            Keyed card, add 0.5%
          </label>
          <label>
            <input
              type="checkbox"
              checked={international}
              onChange={(event) => setInternational(event.target.checked)}
            />
            International card, add 1.5%
          </label>
        </div>
        <p className="quiet">
          Add-ons apply only to the card row, the way Stripe lists them on the US
          card price. The $0.30 brass segment stays a flat fee.
        </p>
        <aside className="margin-note">
          <span className="brass-rule" aria-hidden="true" />
          <div className="prose">
            <p>
              The $0.30 is a large share of a $100 fee and a sliver of a $2,000
              fee. On a $25 tip it is most of the fee.
            </p>
            <p>
              ACH stays the cheap rail once the cap binds at $625. USDC via
              Stripe stays a flat 1.5% and beats the card on both samples.
              Venmo on the web is the expensive row on a small charge because
              of the $0.49. The in-app Venmo business profile is a different
              fee and is not drawn. Zelle stays off the ruler. None of this is
              a quote for your account. Custom pricing, currency conversion,
              and disputes sit outside the picture.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
