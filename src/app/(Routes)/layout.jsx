// Layout.js

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/src/Components/ui/Header/Header";
import Footer from "@/src/Components/ui/Footer/Footer";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Fade-in new content after route is loaded
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [pathname]); // Run this effect when the path changes

  return (
    <>
      <Header />
      <div className="content" ref={containerRef}>
        {children}
      </div>
      <Footer />
    </>
  );
}
