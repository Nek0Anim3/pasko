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
  const coinRef = useRef(null); // Ref для изображения монеты
  const effectContainerRef = useRef(null); // Ref для контейнера эффекта

  
  // Функция для обновления очков
  const updatePoints = () => {
    const updatedPoints = userData.user.points + userData.user.pointsPerTap;
    const updatedMaxPoints = userData.user.maxPoints + userData.user.pointsPerTap;

    updateUserData({
      ...userData,
      user: {
        ...userData.user,
        points: updatedPoints,
        maxPoints: updatedMaxPoints
      }
    });

    // Отправка обновленных данных на сервер через 1 секунду
    fetch('/api/user/putUser', {
      method: 'PUT',
      body: JSON.stringify({
        uid: userData.user.uid,
        points: updatedPoints,
        maxPoints: updatedMaxPoints
      })
    });
  };

  // Обработка нажатия на кнопку (анимация монеты и текста "+1")
  const handleTouchStart = (e) => {
    const containerRect = effectContainerRef.current.getBoundingClientRect();
    const buttonRect = coinRef.current.getBoundingClientRect();

    // Определяем координаты нажатия относительно контейнера
    const touchX = (e.touches?.[0]?.clientX - 0.3 || e.clientX  - 0.3) - containerRect.left;
    const touchY = (e.touches?.[0]?.clientY || e.clientY) - containerRect.top;

    // Смещение для эффекта, чтобы он появлялся над кнопкой
    const offsetY = buttonRect.height * -1.1; // Отрицательное значение для появления выше кнопки

    // Анимация "+1" в пределах контейнера
    const effectEl = document.createElement('div');
    effectEl.innerText = `+${abbreviateNumber(userData.user.pointsPerTap).value}${abbreviateNumber(userData.user.pointsPerTap).suffix}`;
    effectEl.className = styles.tapEffect;
    effectContainerRef.current.appendChild(effectEl);
    
    gsap.fromTo(
      effectEl,
      { x: touchX, y: touchY + offsetY, opacity: 1, scale: 0 },
      { y: touchY + offsetY - 50, scale: 1, opacity: 0, duration: 1.5, ease: "power1.out", onComplete: () => effectEl.remove() }
    );
    // Анимация нажатия на монету
    gsap.to(coinRef.current, {
      scale: 0.96,
      duration: 0.05,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(coinRef.current, { scale: 1, duration: 0.05, ease: "power1.in" });
      }
    });

    // Обновление очков пользователя
    updatePoints();
  };

  // Анимация монетки при загрузке
  useEffect(() => {
    function animate () {
      const timeline = gsap.timeline()

      timeline.fromTo(".coin", {scale: 0}, {scale: 1, ease: "expo.inOut"})
    }

    if(!isLoadingAnim) animate()
  }, [isLoadingAnim])

  return (
    <div className={styles.buttonContainer}>
      <div 
        ref={effectContainerRef} 
        className={styles.effectContainer} 
        onTouchStart={handleTouchStart} 
        onMouseDown={handleTouchStart}
      >
        {/* Кнопка с изображением монеты */}
        <button className={styles.tapbutton}>
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
    </div>
  );
};

export default PaskoCoinButton;
