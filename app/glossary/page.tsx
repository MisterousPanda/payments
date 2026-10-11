import type { Metadata } from "next"
import Link from "next/link"
import { TERMS } from "@/lib/glossary"

export const metadata: Metadata = {
  title: "Words",
  description: "A short glossary for the payment rails on this site.",
}

export default function GlossaryPage() {
  const letters = Array.from(new Set(TERMS.map((term) => term.name[0]))).sort()

  return (
    <>
      <header className="chapter">
        <div className="wrap measure">
          <p className="kicker">Words</p>
          <h1 className="display">The short definitions</h1>
          <p className="deck">
            Each word is the version used in this lesson. The linked page is
            where it earns a longer explanation.
          </p>
        </div>
      </header>
      <article className="section">
        <div className="wrap measure">
          {letters.map((letter) => (
            <section key={letter} aria-labelledby={`letter-${letter}`}>
              <h2 id={`letter-${letter}`} className="glossary-letter">
                {letter}
              </h2>
              {TERMS.filter((term) => term.name.startsWith(letter)).map((term) => (
                <article key={term.name} className="term">
                  <h3>{term.name}</h3>
                  <p>
                    {term.body}{" "}
                    {term.href ? <Link href={term.href}>Read that page</Link> : null}
                  </p>
                </article>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
