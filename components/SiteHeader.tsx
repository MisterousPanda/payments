"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV } from "@/lib/nav"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/">
          The Clearing
        </Link>
        <nav aria-label="Lesson">
          <ul className="nav">
            {NAV.map((item) => {
              const current =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
