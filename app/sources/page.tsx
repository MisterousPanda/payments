import type { Metadata } from "next"
import { SOURCES, type Source } from "@/lib/sources"

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Documents behind The Clearing, and a list of what this lesson will not do.",
}

const GROUPS: Source["group"][] = ["Stripe", "Bank", "Wallets", "Crypto", "Rules"]

export default function SourcesPage() {
  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Sources</p>
          <h1 className="display">What this lesson will not do</h1>
          <p className="deck">
            It cannot pay you, debit a customer, or open an account. Rates are
            the public US figures reviewed on October 10, 2026. Stripe’s pricing
            policy says listed fees can change, and a custom agreement overrides
            the public page.
          </p>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure prose">
          <h2>Limits</h2>
          <ul>
            <li>No live card form, no Plaid Link, no wallet-connect button.</li>
            <li>No Samsung Pay claim for a one-toggle US website button. That was not verified.</li>
            <li>No state-by-state sales-tax thresholds.</li>
            <li>No instruction for moving other people’s money, and no sanctions evasion.</li>
            <li>
              Stripe Tax’s base percentage did not survive the source extraction
              cleanly. Do not quote one from this site. The 5¢ calculation API
              note is on Stripe’s pricing page.
            </li>
            <li>
              The pay-as-you-go Billing rate was published as 0.7% when reviewed.
              Recheck the Billing page before you print it.
            </li>
          </ul>
          {GROUPS.map((group) => (
            <section key={group}>
              <h2>{group}</h2>
              <ul className="source-list">
                {SOURCES.filter((source) => source.group === group).map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noreferrer">
                      {source.name}
                    </a>
                    <div>{source.note}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
