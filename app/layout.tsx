import type { Metadata } from "next"
import { Newsreader, Public_Sans } from "next/font/google"
import { Suspense } from "react"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import "./globals.css"

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  axes: ["opsz"],
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
})

export const metadata: Metadata = {
  title: {
    default: "The Clearing",
    template: "%s · The Clearing",
  },
  description:
    "A lesson in how a US LLC gets paid: cards, bank debits, wallets, and USDC. No payment rail is connected.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to the lesson
        </a>
        <Suspense fallback={<header className="site-header" />}>
          <SiteHeader />
        </Suspense>
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
