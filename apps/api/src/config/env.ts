export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "change-me-access-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "change-me-refresh-secret",
  remitaMerchantId: process.env.REMITA_MERCHANT_ID ?? "demo-merchant",
  remitaApiKey: process.env.REMITA_API_KEY ?? "demo-key",
  frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? "http://localhost:3000",
};
