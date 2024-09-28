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
  const canvasRef = useRef(null);

  
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

    const button = e.currentTarget; // использование currentTarget для доступа к элементу
    const buttonRect = button.getBoundingClientRect();
    const touchX = e.touches[0].clientX - buttonRect.left;
    const touchY = e.touches[0].clientY - buttonRect.top;

    // Обновление очков
    updatePoints();

    // Создание текстовой частицы
    Array.from(e.touches).forEach(touch => {
      const touchX = touch.clientX - buttonRect.left;
      const touchY = touch.clientY - buttonRect.top;

      createParticle(touchX, touchY, `+${abbreviateNumber(userData.user.pointsPerTap).value}${abbreviateNumber(userData.user.pointsPerTap).suffix}`);
    });

      gsap.to(coinRef.current, {
        scale: 0.96,
        duration: 0.05,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(coinRef.current, { scale: 1, duration: 0.05, ease: "power1.in" });
        }
      });
  };

  // Анимация монетки при загрузке
  useEffect(() => {
    function animate () {
      const timeline = gsap.timeline()

      timeline.fromTo(".coin", {scale: 0}, {scale: 1, ease: "expo.inOut"})
    }

    if(!isLoadingAnim) animate()
  }, [isLoadingAnim])


  const createParticle = (x, y, text) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Устанавливаем начальные параметры частицы
    const particle = {
      x: x,
      y: y,
      text: text,
      opacity: 1,
      scale: 1,
      vy: -1, // скорость по вертикали
      lifespan: 1000 // продолжительность жизни в мс
    };

    const drawParticle = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // очищаем холст

      // Устанавливаем стиль текста
      context.font = `${24 * particle.scale}px Arial`;
      context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Рисуем текст
      context.fillText(particle.text, particle.x, particle.y);

      // Обновляем параметры частицы
      particle.y += particle.vy; // движение вверх
      particle.opacity -= 0.03; // уменьшение непрозрачности
      particle.scale += 0.005; // увеличение масштаба

      // Если частица исчезает, останавливаем анимацию
      if (particle.opacity > 0) {
        requestAnimationFrame(drawParticle);
      }
    };

    drawParticle();
  };


  return (
    <div className={styles.buttonContainer} >
        <canvas ref={canvasRef} width={500} height={300} className={styles.canvas} />
        {/* Кнопка с изображением монеты */}
        <button className={styles.tapbutton} onTouchStart={handleTouchStart}>
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
