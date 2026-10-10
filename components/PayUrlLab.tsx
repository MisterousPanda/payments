"use client"

import { useMemo, useState } from "react"

const DEVNET_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
const MAINNET_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

function demoReference() {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join("")
}

export function PayUrlLab() {
  const [amount, setAmount] = useState("1")
  const [memo, setMemo] = useState("order-1001")
  const [reference, setReference] = useState(
    "DemoReferenceNotASecret1111111111111111",
  )
  const [copied, setCopied] = useState(false)

  const url = useMemo(() => {
    const params = new URLSearchParams({
      amount: amount || "0",
      "spl-token": DEVNET_MINT,
      reference,
      label: "DEVNET FAKE MONEY",
      message: "Lesson only. No dollar value.",
      memo,
    })
    return `solana:DemoMerchantNotARealAddress1111111111111?${params.toString()}`
  }, [amount, memo, reference])

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="lab">
      <p className="ink">
        <strong>DEVNET — FAKE MONEY</strong>
      </p>
      <p>
        This builds a Solana Pay transfer-request string in the browser. The
        recipient is not a real address. Do not scan it with a wallet that holds
        mainnet funds.
      </p>
      <label htmlFor="usdc-amount">Amount, in devnet USDC</label>
      <input
        id="usdc-amount"
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <label htmlFor="usdc-memo">Memo</label>
      <input
        id="usdc-memo"
        type="text"
        value={memo}
        onChange={(event) => setMemo(event.target.value)}
      />
      <p className="url-out">{url}</p>
      <button className="ghost" type="button" onClick={copy}>
        {copied ? "Copied the demo URL" : "Copy the demo URL"}
      </button>
      <button
        className="ghost"
        type="button"
        onClick={() => {
          setReference(demoReference())
          setCopied(false)
        }}
      >
        New demo reference
      </button>
      <div className="sheet-scroll">
        <table className="sheet">
          <caption className="sr-only">Fields in the demo URL</caption>
          <tbody>
            <tr>
              <th scope="row">recipient</th>
              <td>A placeholder. Replace it with a devnet address you control before a wallet sees it.</td>
            </tr>
            <tr>
              <th scope="row">spl-token</th>
              <td>
                Devnet USDC <span className="num">{DEVNET_MINT}</span>. Mainnet native
                USDC is a different mint: <span className="num">{MAINNET_MINT}</span>.
              </td>
            </tr>
            <tr>
              <th scope="row">reference</th>
              <td>
                {reference}. A demo id for one order. Not a seed, not a secret, not a wallet.
              </td>
            </tr>
            <tr>
              <th scope="row">memo</th>
              <td>{memo || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
