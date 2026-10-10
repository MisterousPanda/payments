import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="colophon">
      <div className="wrap measure">
        <p>A lesson in how a US LLC gets paid.</p>
        <p>Newsreader and Public Sans.</p>
        <p>No payment rail is connected.</p>
        <p className="quiet">
          Public US prices reviewed October 10, 2026. Not legal, tax, or payments
          advice. <Link href="/sources">Sources and limits</Link>.
        </p>
      </div>
    </footer>
  )
}
