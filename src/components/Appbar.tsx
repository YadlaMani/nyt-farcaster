"use client";

import { useState } from "react";

import { ModeToggle } from "./ui/mode-toggle";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "@/utils/thridWebClient";
import { APP_NAME, DASHBOARD_LABEL } from "../../lib/constants";

import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Appbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex backdrop-blur-lg bg-white/80 dark:bg-black/50 mx-4 md:mx-24 justify-between items-center px-4 md:px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-2 z-50">
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/">{APP_NAME}</Link>
      </div>

      <button
        className="md:hidden text-gray-800 dark:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <header className="hidden md:flex items-center gap-4">
        <Link href="/allmarkets">{DASHBOARD_LABEL}</Link>
        <ModeToggle />
        <ConnectButton
          client={client}
          wallets={wallets}
          connectModal={{ size: "compact" }}
        />
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black shadow-lg p-4 flex flex-col items-center gap-3 md:hidden">
          <Link href="/allmarkets">{DASHBOARD_LABEL}</Link>
          <ModeToggle />
          <ConnectButton
            client={client}
            wallets={wallets}
            connectModal={{ size: "compact" }}
          />
        </div>
      )}
    </div>
  );
}
