"use client"

import { useRef } from "react"

type Option = { id: string; label: string }

export function RailToggle({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string
  value: string
  options: readonly Option[]
  onChange: (id: string) => void
  className?: string
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function move(next: string) {
    onChange(next)
    refs.current[next]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const ids = options.map((option) => option.id)
    const index = Math.max(0, ids.indexOf(value))
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault()
      move(ids[(index + 1) % ids.length])
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault()
      move(ids[(index - 1 + ids.length) % ids.length])
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={className ? `toggle ${className}` : "toggle"}
      onKeyDown={onKeyDown}
    >
      {options.map((option) => {
        const selected = value === option.id
        return (
          <button
            key={option.id}
            ref={(node) => {
              refs.current[option.id] = node
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
