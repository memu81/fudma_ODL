import Link from "next/link";
import { NetworkBadge } from "@/components/network-badge";

const highlights = [
  "Flexible distance learning for working students",
  "Mobile-first applicant portal for low-bandwidth access",
  "Transparent admissions and payment tracking",
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="card">
        <p className="chip">Federal University Dutsin-Ma</p>
        <h1 style={{ marginTop: 10 }}>Open and Distance Learning (ODL)</h1>
        <p className="muted">
          Start your application, pay with Remita TSA, and track your admission
          status from your phone.
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/apply" className="button">
            Start Application
          </Link>
          <Link href="/status" className="button secondary">
            Track Status
          </Link>
        </div>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item} className="card">
            <p>{item}</p>
          </article>
        ))}
      </section>

      <NetworkBadge />
    </main>
  );
}
