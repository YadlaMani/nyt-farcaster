import { NextResponse } from "next/server";

interface AccountAssociation {
  header: string;
  payload: string;
  signature: string;
}

interface Frame {
  version: string;
  name: string;
  iconUrl: string;
  homeUrl: string;
  imageUrl: string;
  buttonTitle: string;
  splashImageUrl: string;
  splashBackgroundColor: string;
  webhookUrl: string;
  screenshotUrls?: string[];
  tags?: string[];
  primaryCategory?: string;
}

interface FarcasterConfig {
  accountAssociation?: AccountAssociation;
  frame: Frame;
}

const APP_URL = "https://nyt-farcaster-n2t6.vercel.app";

export async function GET() {
  const farcasterConfig: FarcasterConfig = {
    accountAssociation: {
      header:
        "eyJmaWQiOjExMDU1ODEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5OWEyNzEyOTJCMDhBRDQ5OTU2YUMzM0MzNmI3NjgyYzIxMDI5NTE3In0",
      payload: "eyJkb21haW4iOiJub3R5b3VydHlwZS54eXoifQ",
      signature:
        "MHhjZGFiMTU4ZjZhNzFhODNlYzBkY2EwZDM3ZDg2MjI4NDYxY2NmZTU5NDdiZTc5M2I1MTRkYmQzM2VmNzZjN2VhM2M4Zjc3NzkxMGUwNTUwZjlmZTY1NDIxYTE4NmVjZDRjNzkxN2ZjNzU2YzFiNGI1MzYzZTkzOTVjMzZkYTA5MjFj",
    },

    frame: {
      version: "1",
      name: "notyourtype",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["coordi", "farcaster", "miniapp"],
      primaryCategory: "social",
      buttonTitle: "Launch Template",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
