"use client";

import { useEffect, useMemo, useState } from "react";
import type { ApplicationDraftPayload, ApplicationResponse } from "../lib/types";
import { StepProgress } from "./step-progress";
import { env } from "@/lib/env";

const DRAFT_STORAGE_KEY = "fudma-odl-draft-v1";

type SubmissionState = "idle" | "saving" | "saved" | "error";

const defaultDraft: ApplicationDraftPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  programId: "",
  session: "2026/2027",
};

export function ApplicationForm() {
  const [draft, setDraft] = useState<ApplicationDraftPayload>(() => {
    if (typeof window === "undefined") {
      return defaultDraft;
    }

    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) {
      return defaultDraft;
    }

    try {
      return { ...defaultDraft, ...(JSON.parse(raw) as ApplicationDraftPayload) };
    } catch {
      return defaultDraft;
    }
  });

  const [saveState, setSaveState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [token, setToken] = useState<string>(env.mockApplicantToken);

  useEffect(() => {
    setToken(window.localStorage.getItem("accessToken") ?? env.mockApplicantToken);
  }, []);

  const completion = useMemo(() => {
    const values = [
      draft.firstName,
      draft.lastName,
      draft.email,
      draft.phoneNumber,
      draft.programId,
      draft.session,
    ];

    const filled = values.filter((value) => value.trim().length > 0).length;
    return Math.round((filled / values.length) * 100);
  }, [draft]);

  function updateField<K extends keyof ApplicationDraftPayload>(
    key: K,
    value: ApplicationDraftPayload[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
  }

  function saveDraft() {
    try {
      setSaveState("saving");
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setSaveState("saved");
      setSubmissionMessage("Draft saved locally for offline continuity.");
    } catch {
      setSaveState("error");
      setSubmissionMessage("Could not save draft on this browser.");
    }
  }

  async function submitApplication() {
    setSaveState("saving");
    setSubmissionMessage("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...draft,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const payload = (await response.json()) as ApplicationResponse;
      setSaveState("saved");
      setSubmissionMessage(
        `Draft saved successfully. Number: ${payload.applicationNumber}`,
      );
    } catch {
      setSaveState("error");
      setSubmissionMessage(
        "Submission failed due to network or server issue. Keep draft and retry.",
      );
    }
  }

  return (
    <section className="panel" aria-label="application form">
      <h2>Application Form (Sprint 1 Scaffold)</h2>
      <p className="subtle">
        Drafts are saved locally to support unstable connections.
      </p>
      <StepProgress percentage={completion} />
      <div className="grid">
        <label>
          First name
          <input
            value={draft.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            required
          />
        </label>
        <label>
          Last name
          <input
            value={draft.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={draft.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
        </label>
        <label>
          Phone number
          <input
            value={draft.phoneNumber}
            onChange={(event) => updateField("phoneNumber", event.target.value)}
            required
          />
        </label>
        <label>
          Program code
          <input
            value={draft.programId}
            onChange={(event) => updateField("programId", event.target.value)}
            placeholder="e.g. BSC-CS"
            required
          />
        </label>
        <label>
          Session
          <input
            value={draft.session}
            onChange={(event) => updateField("session", event.target.value)}
            required
          />
        </label>
      </div>

      <div className="actions">
        <button type="button" onClick={saveDraft}>
          Save Draft
        </button>
        <button type="button" className="primary" onClick={submitApplication}>
          Submit Application
        </button>
      </div>

      {submissionMessage && (
        <p role="status" className={saveState === "error" ? "error" : "success"}>
          {submissionMessage}
        </p>
      )}
    </section>
  );
}
