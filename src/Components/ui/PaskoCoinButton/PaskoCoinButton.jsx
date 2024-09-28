"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const { default: useUserStore } = require("@/src/Store/userStore");

import styles from './PaskoCoinButton.module.css'
import abbreviateNumber from "@/src/utils/abbreviateNumber";
import gsap from "gsap";
import useLoadingStore from "@/src/Store/loadingStore";

const PaskoCoinButton = () => {
  const {userData, updateUserData} = useUserStore()


  // Обработка клика по экрану
  const handleTouchStart = (e) => {
    Array.from(e.touches).forEach((touch) => {
      const buttonRect = e.target.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
  
      // Создаем новый эффект на основе касания
      const newEffect = {
        id: Date.now() + touch.identifier, // уникальный id для каждого касания
        x: buttonCenterX + offsetX,
        y: buttonCenterY + offsetY,
        text: `+${abbreviateNumber(userData.user.pointsPerTap).value}${abbreviateNumber(userData.user.pointsPerTap).suffix}`
      };
  
      setEffects((prevEffects) => [...prevEffects, newEffect]);
  
      // Обновляем количество очков пользователя
      const updatedPoints = userData.user.points + userData.user.pointsPerTap;
      const updatedMaxPoints = userData.user.maxPoints + userData.user.pointsPerTap;
  
      // Вызываем метод для обновления состояния
      updateUserData({
        ...userData,
        user: {
          ...userData.user,
          points: updatedPoints,
          maxPoints: updatedMaxPoints
        }
      });
  
      // Сбрасываем таймер при каждом касании
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
  
      // Устанавливаем новый таймер на 1 секунду
      const newTimeout = setTimeout(() => {
        // Отправка запроса на сервер
        fetch('/api/user/putUser', {
          method: 'PUT',
          body: JSON.stringify({
            uid: userData.user.uid,
            points: updatedPoints,
            maxPoints: updatedMaxPoints
          })
        });
      }, 1000);
  
      setClickTimeout(newTimeout);
    });
  };

  const [clickTimeout, setClickTimeout] = useState(null); // Для хранения таймера

  //ТУТА ВОТ ИЗМЕНЕНИЕ РАЗМЕРОВ КАРТИНКИ ТОЛИКА 
  const initialSize = { width: 300, height: 300 };
  const [size, setSize] = useState(initialSize);
  const MouseDN = () => {
    setSize({
      width: initialSize.width - 5,
      height: initialSize.height - 5,
    });
  };

  const MouseUP = () => {
    setSize(initialSize);
  };

  //ТУТ ПОТУЖНИЙ ПРИКОЛ С АНИМАЦИЕЙ (ПРОДА В CSS)
  const [effects, setEffects] = useState([]);

  // Удаление эффекта через секунду
  useEffect(() => {
    const timers = effects.map(effect => {
      return setTimeout(() => {
        setEffects((prevEffects) => prevEffects.filter(e => e.id !== effect.id));
      }, 1000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [effects]);


  //Анимация монетки
  const {isLoadingAnim} = useLoadingStore();
  useEffect(() => {
    function animate () {
      const timeline = gsap.timeline()

      timeline.fromTo(".coin", {scale: 0}, {scale: 1, ease: "expo.inOut"})
    }

    if(!isLoadingAnim) animate()
  }, [isLoadingAnim])

  return(
    <div className={styles.buttonContainer}>
      <div className={styles.clickArea} onTouchStart={handleTouchStart}>
          {effects.map(effect => (
            <span
              key={effect.id}
              className={styles.tapEffect}
              style={{ left: effect.x, top: effect.y }}
            >
              {effect.text}
            </span>
          ))}
          <button className={styles.tapbutton} onMouseDown={MouseDN} onMouseUp={MouseUP} onTouchStart={MouseDN} onTouchEnd={MouseUP}>
            <Image className={styles.paskoimage} src={'/paskocoin.png'/*Єх вотбі оні мінялісь*/} width={size.width} height={size.height} alt="pasko"></Image>
          </button>
      </div>
    </div>
  )
}

export default PaskoCoinButton