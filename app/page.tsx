import App from "@/app/page";

import type { Metadata } from "next";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const frame = {
  version: "next",
  imageUrl:
    "https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fd24c5eb88e0841ce8c2ba1c783103f66%2Fprojects%2F297a153123d84db0816031a95a9f9c5e%2Fa193380a-472c-40b4-8aea-63effc2239f3.jpeg&w=1440&q=75",
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
