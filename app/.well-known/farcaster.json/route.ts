import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add account association
    "accountAssociation": {
      "header": "",
      "payload": "",
      "signature": ""
    },
    frame: {
      version: "1",
      name: "not your type",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["not your type", "farcaster", "miniapp"],
      primaryCategory: "social",
      buttonTitle: "not your type",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#14051a",
      subtitle: "not your type",
      description: "not your type",
      webhookUrl: `${APP_URL}/api/webhook`,
      // primaryCategory: "social",
      tagline:"not your type",
      ogTitle:"not your type",
      ogDescription: "not your type",
      ogImageUrl: `${APP_URL}/images/feed.png`,
      heroImageUrl: `${APP_URL}/images/feed.png`,
    },
  };

  return NextResponse.json(farcasterConfig);
}