'use client';

import useUserStore from "@/src/Store/userStore";
import styles from "./page.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"
import abbreviateNumber from "@/src/utils/abbreviateNumber";
import useLoadingStore from "@/src/Store/loadingStore";
import gsap from "gsap";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


export default function Farm() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#2b2727',
      ...theme.applyStyles('dark', {
        backgroundColor: '#2b2727',
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#fff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#fff',
      }),
    },
  }));










  const { userData, updateUserData } = useUserStore(); // состояние и метод для обновления состояния

  const [clickTimeout, setClickTimeout] = useState(null); // Для хранения таймера

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
      text: `+${abbreviateNumber(userData.user.pointsPerTap).value}${abbreviateNumber(userData.user.pointsPerTap).suffix}`
    };

    setEffects((prevEffects) => [...prevEffects, newEffect]);

    // Обновляем количество очков пользователя
    const updatedPoints = userData.user.points + (userData.user.pointsPerTap);
    
    // Вызываем метод для обновления состояния
    updateUserData({
      ...userData,
      user: {
        ...userData.user,
        points: updatedPoints
      }
    });

    // Сбрасываем таймер при каждом клике
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    // Устанавливаем новый таймер на 1 секунду
    const newTimeout = setTimeout(() => {
      // Отправка запроса на сервер
      console.log("Отправка запроса на сервер для обновления данных...");
      fetch('/api/user/putUser', { method: 'PUT', body: JSON.stringify({uid: userData.user.uid, points: (userData.user.points + userData.user.pointsPerTap)})});
    }, 1000);

    setClickTimeout(newTimeout);
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

  //Анимация монетки
  const {isLoadingAnim} = useLoadingStore();

  useEffect(() => {
    function animate () {
      const timeline = gsap.timeline()

      timeline.fromTo(".coin", {scale: 0}, {scale: 1, ease: "expo.inOut"})
    }

    if(!isLoadingAnim) animate()
  }, [isLoadingAnim])

  return  (
    <div className={`coin ${styles.clickerContent}`}>
      <div className={styles.clickerContaienr}>
        <div className={styles.lvlContainer}>
          <div className={styles.lvltext}>
            <div className={styles.lvl}>LVL 1</div>
            <div className={styles.lvl}>10%</div>
          </div>
          <BorderLinearProgress variant="determinate" value={25} />
          <div className={styles.actualPoints}>{/*ВЫДУМАЙ КАК ОТЕТО ПРИВЯЗАТЬ, А ТО userData.user.points не канает (null)*/}20,000,000</div>
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
                <Image className={styles.paskoimage} src={'/paskocoin.png'/*Єх вотбі оні мінялісь*/} width={size.width} height={size.height} alt="pasko"></Image>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}