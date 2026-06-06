"use client";

import Link from "next/link";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col lg:pl-[240px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
          <footer className="mt-16 border-t border-[var(--border)] pt-6 pb-8 text-center text-xs text-[var(--muted-foreground)]">
            <p>&copy; {new Date().getFullYear()} Thesis. All rights reserved.</p>
            <p className="mt-1">
              Built by Himani Musku &middot;{" "}
              <Link href="/about" className="text-[var(--primary)] hover:underline">
                About
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
