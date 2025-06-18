import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add account association

    accountAssociation: {
      header:
        "eyJmaWQiOjExMDU1ODEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5OWEyNzEyOTJCMDhBRDQ5OTU2YUMzM0MzNmI3NjgyYzIxMDI5NTE3In0",
      payload: "eyJkb21haW4iOiJueXQtZmFyY2FzdGVyLW4ydDYudmVyY2VsLmFwcCJ9",
      signature:
        "MHgzYTNmYWUyOGFmNTUwNTcwZDVhZDI1ZmVhNGY2NTdlOWVjODVhMDU0YzZiMzI5YTQxNTkzZjhhMGJiM2JhMTY4N2JlMzJlOTYxN2Q4ZDgwM2VhYWY4NWNjMDgwNzc5MjM0OWRlNjg5YTVkMDg4M2EwMjY2ODcwNWE5MTQ3NTI3ODFj",
    },
    frame: {
      version: "1",
      name: "not your type",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["coordi", "farcaster", "miniapp"],
      primaryCategory: "social",
      buttonTitle: "Launch Template",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#14051a",
      subtitle: "not your type",
      description: "not your type",
      webhookUrl: `${APP_URL}/api/webhook`,
      tagline: "not your type",
      ogTitle: "not your type",
      ogDescription: "not your type",
      ogImageUrl: `${APP_URL}/images/feed.png`,
      heroImageUrl: `${APP_URL}/images/feed.png`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
