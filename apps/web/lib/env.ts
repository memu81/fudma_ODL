const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const mockApplicantToken = process.env.NEXT_PUBLIC_MOCK_APPLICANT_TOKEN ?? "";

export const env = {
  apiBaseUrl,
  mockApplicantToken,
};
