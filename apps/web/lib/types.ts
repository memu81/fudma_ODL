export type ApplicationStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW";

export interface Program {
  id: string;
  code: string;
  name: string;
  faculty: string;
  department: string;
  durationInYears: number;
}

export interface ApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  programId: string;
  session: string;
}

export interface ApplicationResponse {
  id: string;
  applicationNumber: string;
  status: ApplicationStatus;
  programId: string;
  session: string;
}

export interface RemitaInitiateResponse {
  reference: string;
  rrr: string;
  amount: number;
  status: "PENDING";
}

export interface ApplicationDraftPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  programId: string;
  session: string;
}
