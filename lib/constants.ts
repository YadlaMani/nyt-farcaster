export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
export const APP_URL = process.env.NEXT_PUBLIC_URL! || "http://localhost:3000";
if (!APP_URL) {
  throw new Error("NEXT_PUBLIC_URL is not set");
}

export const APP_NAME = "Not Your Type";
export const DASHBOARD_LABEL = "Dashboard";
