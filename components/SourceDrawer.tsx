"use client"

import { useEffect, useId, useState } from "react"
import { DRAWER_SOURCES, SOURCES } from "@/lib/sources"

export function SourceDrawer() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const wanted = new Set<string>(DRAWER_SOURCES)
  const items = SOURCES.filter((source) => wanted.has(source.name))

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <section className="drawer">
      <div className="wrap">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          Sources and what this page will not do
        </button>
        <div
          id={panelId}
          className={open ? "panel-grid open" : "panel-grid"}
          aria-hidden={!open}
          inert={!open ? true : undefined}
        >
          <div className="panel-inner">
            <ul className="source-list">
              {items.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.name}
                  </a>
                  <div className="quiet">{source.note}</div>
                </li>
              ))}
            </ul>
            <p>
              This site is a lesson. It cannot pay you, debit a customer, or open
              an account.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
