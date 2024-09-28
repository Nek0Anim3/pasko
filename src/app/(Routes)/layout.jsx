// Layout.js

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/src/Components/ui/Header/Header";
import Footer from "@/src/Components/ui/Footer/Footer";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const containerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const navigateWithDelay = (newPath) => {
    // Start fade-out animation before changing the route
    gsap.to(containerRef.current, {
      duration: 0.5,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        // After animation, wait a bit and then change the route
        router.push(newPath);
      },
    });
  };

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
