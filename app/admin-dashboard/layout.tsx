"use client";

import React, { useState } from "react";
import Sidenav from "@components/sidenav";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex min-h-screen">
      <Sidenav isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toaster richColors position="top-center" />
      <div
        className={`flex-1 ${isOpen ? "ml-60" : "ml-8"} overflow-y-auto pl-6`}
      >
        {children}
      </div>
    </div>
  );
}
