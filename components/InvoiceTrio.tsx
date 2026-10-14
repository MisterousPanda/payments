import {
  dollarsToCents,
  keepCents,
  moneyFromCents,
  quote,
} from "@/lib/fees"

const JOBS = [
  { name: "Tip jar", dollars: 25 },
  { name: "Afternoon consult", dollars: 400 },
  { name: "Monthly retainer", dollars: 1800 },
]

export function InvoiceTrio() {
  return (
    <div className="sheet-scroll">
      <table className="sheet">
        <caption className="sr-only">
          Illustrative fees on three invoices using the public US rates on this site
        </caption>
        <thead>
          <tr>
            <th scope="col">Invoice</th>
            <th scope="col">Amount</th>
            <th scope="col">Card fee</th>
            <th scope="col">You keep</th>
            <th scope="col">ACH fee</th>
            <th scope="col">Venmo on the web</th>
            <th scope="col">Zelle</th>
            <th scope="col">USDC via Stripe</th>
          </tr>
        </thead>
        <tbody>
          {JOBS.map((job) => {
            const priced = quote(dollarsToCents(job.dollars))
            return (
              <tr key={job.name}>
                <th scope="row">{job.name}</th>
                <td className="num">{moneyFromCents(priced.amountCents)}</td>
                <td className="num">{moneyFromCents(priced.cardCents)}</td>
                <td className="num">
                  {moneyFromCents(keepCents(priced.amountCents, priced.cardCents))}
                </td>
                <td className="num">{moneyFromCents(priced.achCents)}</td>
                <td className="num">{moneyFromCents(priced.venmoCents)}</td>
                <td>Bank terms</td>
                <td className="num">{moneyFromCents(priced.usdcCents)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
