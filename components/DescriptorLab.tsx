"use client"

import { useMemo, useState } from "react"

const FORBIDDEN = /[<>\\'"*]/
const HAS_LETTER = /[A-Za-z]/
const LATIN = /^[\x20-\x7E]*$/

function issuesFor(value: string): string[] {
  const issues: string[] = []
  if (value.length < 5) issues.push("Use at least 5 characters.")
  if (value.length > 22) issues.push("Stop at 22 characters.")
  if (!HAS_LETTER.test(value)) issues.push("Include at least one letter.")
  if (value.length > 0 && !LATIN.test(value)) {
    issues.push("Stay in Latin letters, numbers, and plain punctuation.")
  }
  if (FORBIDDEN.test(value)) issues.push("Remove < > \\ ' \" and *.")
  return issues
}

export function DescriptorLab() {
  const [value, setValue] = useState("ACME STUDIO")
  const issues = useMemo(() => issuesFor(value), [value])

  return (
    <div className="lab">
      <label htmlFor="descriptor">Statement descriptor</label>
      <input
        id="descriptor"
        type="text"
        value={value}
        maxLength={32}
        autoComplete="off"
        onChange={(event) => setValue(event.target.value)}
      />
      <p className="quiet">
        {value.length} characters. Stripe allows 5 to 22, with at least one letter.
      </p>
      <div className="preview" aria-live="polite">
        {issues.length === 0
          ? `A customer’s bank might show: ${value}`
          : "Not ready for a statement yet."}
      </div>
      {issues.length > 0 ? (
        <ul className="issues">
          {issues.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      ) : (
        <p>
          The shape is allowed. It still has to be a name the customer will
          recognize, usually the DBA, not a random code.
        </p>
      )}
    </div>
  )
}
