export function Ask({
  items,
}: {
  items: readonly { q: string; a: string }[]
}) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="ask">
          <summary>{item.q}</summary>
          <div>{item.a}</div>
        </details>
      ))}
    </div>
  )
}
