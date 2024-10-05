"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "@/src/Components/ui/Header/Header";
import Footer from "@/src/Components/ui/Footer/Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const containerRef = useRef(null);
  const pathname = usePathname();
  
  // Состояние для отслеживания, был ли пользователь уже на главной странице
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Логика для страницы /upgrades/main (или /upgrade)
    const isMainPage = pathname === "/upgrade" || pathname === "/upgrade/main";
    const isUpgradePage = /^\/upgrade(\/.*)?$/.test(pathname);

    // Анимация только при первом заходе на /upgrade/main
    if (isMainPage && isFirstVisit) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      setIsFirstVisit(false); // После первого посещения анимация не будет повторяться
    } else if (!isUpgradePage){
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      )
    } else if (isUpgradePage) {
      gsap.to(
        containerRef.current,
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [pathname, isFirstVisit]); // Следим за изменением пути и состоянием первого посещения

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
