"use client"

import { useState } from "react"
import { RAILS, type RailId } from "@/lib/rails"
import { RailToggle } from "@/components/RailToggle"

const STATIONS = [8.333, 29.167, 50, 70.833, 91.667]

export function Clearing() {
  const [rail, setRail] = useState<RailId>("card")
  const current = RAILS.find((item) => item.id === rail) ?? RAILS[0]
  const labels = ["Payer", current.instrument, current.rail, "Stripe", "Account"]

  return (
    <section className="hero" aria-labelledby="clearing-title">
      <div className="wrap">
        <div className="measure">
          <p className="kicker">For a US LLC</p>
          <h1 id="clearing-title" className="display">
            How the money actually arrives
          </h1>
          <p className="deck">
            Four rails into one account. Authorization is not settlement, and
            settlement is not always final.
          </p>
        </div>
        <div className="clearing" data-rail={rail}>
          <RailToggle
            className="rail-toggle"
            label="Payment rail"
            value={rail}
            options={RAILS.map((item) => ({ id: item.id, label: item.label }))}
            onChange={(id) => setRail(id as RailId)}
          />
          <div className="diagram-wide">
            <div className="rail-box" aria-hidden="true">
              <div className="rail-line" />
              <div className="wax-line" />
              {STATIONS.map((percent) => (
                <i key={percent} className="station-square" style={{ left: `${percent}%` }} />
              ))}
              <i className="return-arc" />
              <i className="brass-lock" />
              <i className="mover" />
            </div>
            <div className="station-labels">
              {labels.map((label, index) => (
                <span key={STATIONS[index]} style={{ left: `${STATIONS[index]}%` }}>
                  {label}
                </span>
              ))}
              <span
                className={current.tag ? "tag-slot on" : "tag-slot"}
                style={{ left: "29.167%" }}
                aria-hidden={current.tag ? undefined : true}
              >
                {current.tag ?? "Plaid · account check"}
              </span>
            </div>
          </div>
          <div className="stack" aria-hidden="true">
            <div className="stack-line" />
            <span className="stack-packet" />
            <ol>
              {labels.map((label) => (
                <li key={label}>
                  <strong>{label}</strong>
                  {label === current.instrument && current.tag ? (
                    <span className="quiet"> {current.tag}</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <div aria-live="polite">
            <p className="plaque">{current.plaque}</p>
            <p className="caption">{current.caption}</p>
          </div>
          <p className="quiet">No payment is sent. Toggles only change the picture.</p>
        </div>
      </div>
    </section>
  )
}
