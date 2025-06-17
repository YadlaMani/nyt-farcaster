import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

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

export async function GET() {
  const farcasterConfig: FarcasterConfig = {
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
