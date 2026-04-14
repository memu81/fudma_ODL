export default function StatusPage() {
  return (
    <main className="page-shell">
      <section className="card">
        <p className="chip">Application Tracking</p>
        <h1>Track Your Admission Status</h1>
        <p className="muted">
          Status tracking UI is scaffolded for Sprint 1. In the next increment this
          page will query <code>/api/v1/applications/:applicationNumber</code>.
        </p>
      </section>
    </main>
  );
}
