import { ApplicationForm } from "../../components/application-form";
import { NetworkBadge } from "../../components/network-badge";

export default function ApplyPage() {
  return (
    <main className="page-shell">
      <section className="card">
        <h1>New Application</h1>
        <p className="muted">
          Complete your details and submit for screening. You can save draft and
          continue later.
        </p>
        <NetworkBadge />
      </section>
      <ApplicationForm />
    </main>
  );
}
