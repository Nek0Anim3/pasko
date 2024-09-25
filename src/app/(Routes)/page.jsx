'use client';

import useUserStore from "@/src/Store/userStore";
import styles from "./page.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"
import abbreviateNumber from "@/src/utils/abbreviateNumber";

export default function Farm() {
  const { userData, updateUserData } = useUserStore(); // состояние и метод для обновления состояния

  //ТУТ ПОТУЖНИЙ ПРИКОЛ С АНИМАЦИЕЙ (ПРОДА В CSS)
  const [effects, setEffects] = useState([]);

  // Обработка клика по экрану
  const handleClick = (e) => {
    const buttonRect = e.target.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2; 
    const buttonCenterY = buttonRect.top + buttonRect.height / 2; 
    const offsetX = (Math.random() - 0.5) * 100; 
    const offsetY = (Math.random() - 0.5) * 100; 

    // Создаем новый эффект на основе клика
    const newEffect = {
      id: Date.now(),
      x: buttonCenterX + offsetX, 
      y: buttonCenterY + offsetY, 
      text: `+${abbreviateNumber(userData.user.pointsPerTap+999)}`
    };

    setEffects((prevEffects) => [...prevEffects, newEffect]);

    // Обновляем количество очков пользователя
    const updatedPoints = userData.user.points + (userData.user.pointsPerTap+999);
    
    // Вызываем метод для обновления состояния
    updateUserData({
      ...userData,
      user: {
        ...userData.user,
        points: updatedPoints
      }
    });
  };

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

  return  (
    <div className={styles.clickerContent}>
      <div className={styles.clickerContaienr}>
        <div className={styles.lvlContainer}>
          <div className={styles.lvl}></div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.clickArea} onClick={handleClick}>
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
                <Image className={styles.paskoimage} src={'/paskocoin.png'} width={size.width} height={size.height}></Image>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}