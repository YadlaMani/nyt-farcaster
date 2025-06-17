import { NextResponse } from "next/server";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add account association
    accountAssociation: {
      header: "",
      payload: "",
      signature: "",
    },
    frame: {
      version: "1",
      name: "notyourtype",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["coordi", "farcaster", "miniapp"],
      primaryCategory: "",
      buttonTitle: "Launch Template",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
