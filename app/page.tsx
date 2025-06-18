import App from "@/app/page";

import type { Metadata } from "next";
import { APP_URL } from "../lib/constants";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: "notyourtype",
    action: {
      type: "launch_frame",
      name: "notyourtype",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "notyourtype",
    openGraph: {
      title: "notyourtype",
      description: "A template for building mini-apps on Farcaster and Monad",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}
