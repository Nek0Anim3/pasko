"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import useUserStore from "@/src/Store/userStore";
import useLoadingStore from "@/src/Store/loadingStore";
import abbreviateNumber from "@/src/utils/abbreviateNumber";
import styles from './PaskoCoinButton.module.css';

const PaskoCoinButton = () => {
  const { userData, updateUserData } = useUserStore();
  const { isLoadingAnim } = useLoadingStore();
  
  const initialSize = { width: 300, height: 300 };
  const [size, setSize] = useState(initialSize);
  const coinRef = useRef(null); 
  const effectContainerRef = useRef(null);
  const canvasRef = useRef(null);
  let clickTimeout = useRef(null); // Используем useRef для хранения таймера

  const updatePoints = ({updatedPoints, updatedMaxPoints}) => {
    // Отправка обновленных данных на сервер через 1 секунду
    fetch("/api/user/putUser", {
      method: "PUT",
      body: JSON.stringify({
        uid: userData.user.uid,
        points: updatedPoints,
        maxPoints: updatedMaxPoints,
      }),
    });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    clearTimeout(clickTimeout.current); // Очистка предыдущего таймера

    // Обновление очков
    Array.from(e.touches || [e]).forEach((touch) => {
      const touchX = (touch.clientX || touch.touches[0].clientX) - buttonRect.left;
      const touchY = (touch.clientY || touch.touches[0].clientY) - buttonRect.top;

      createParticle(
        touchX,
        touchY,
        `+${abbreviateNumber(userData.user.pointsPerTap).value}${abbreviateNumber(userData.user.pointsPerTap).suffix}`
      );
    });

    gsap.to(coinRef.current, {
      scale: 0.96,
      duration: 0.05,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(coinRef.current, { scale: 1, duration: 0.05, ease: "power1.in" });
      },
    });

    let updatedPoints = userData.user.points + userData.user.pointsPerTap;
    let updatedMaxPoints = userData.user.maxPoints + userData.user.pointsPerTap;

    updateUserData({
      ...userData,
      user: {
        ...userData.user,
        points: updatedPoints,
        maxPoints: updatedMaxPoints,
      },
    });

    clickTimeout.current = setTimeout(() => {
      updatePoints({updatedPoints, updatedMaxPoints});
    }, 1000);
  };

  useEffect(() => {
    const animate = () => {
      const timeline = gsap.timeline();
      timeline.fromTo(".coin", { scale: 0 }, { scale: 1, ease: "expo.inOut" });
    };

    if (!isLoadingAnim) animate();
  }, [isLoadingAnim]);

  const createParticle = (x, y, text) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const particle = {
      x,
      y,
      text,
      opacity: 1,
      scale: 1,
      vy: -1,
      lifespan: 1000, 
    };

    const drawParticle = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); 

      context.font = `${24 * particle.scale}px Arial`;
      context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      context.fillText(particle.text, particle.x, particle.y);

      particle.y += particle.vy; 
      particle.opacity -= 0.03; 
      particle.scale += 0.005; 

      if (particle.opacity > 0) {
        requestAnimationFrame(drawParticle);
      }
    };

    drawParticle();
  };

  return (
    <div className={styles.buttonContainer}>
      <canvas ref={canvasRef} width={500} height={300} className={styles.canvas} />
      <button className={styles.tapbutton} onTouchStart={handleTouchStart} onClick={handleTouchStart}>
        <Image
          ref={coinRef}
          className={styles.paskoimage}
          src="/paskocoin.png"
          width={size.width}
          height={size.height}
          alt="pasko"
        />
      </button>
    </div>
  );
};

export default PaskoCoinButton;
