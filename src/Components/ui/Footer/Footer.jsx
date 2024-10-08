'use client';
import Image from 'next/image';
import styles from './Footer.module.css';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import useLoadingStore from '@/src/Store/loadingStore';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState(null); // Добавляем состояние для активной кнопки
  const {isLoadingAnim} = useLoadingStore();
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: '0px', 
  });
  const buttonRefs = useRef([]);

  const navigateWithDelay = (newPath) => {
    // Start fade-out animation before changing the route
    gsap.to(".content", {
      duration: 0.1,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        // After animation, wait a bit and then change the route
        router.push(newPath);
      },
    });
  };

  useEffect(() => {
    function animate () {
      const timeline = gsap.timeline()

      timeline.to("footer", {bottom: "0", ease: "power2.inOut"})
    }

    if(!isLoadingAnim) animate()
  }, [isLoadingAnim])

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex); // Меняем активную кнопку
  };

  useEffect(() => {
    if (buttonRefs.current[activeButton - 1]) {
      const button = buttonRefs.current[activeButton - 1];
      const buttonRect = button.getBoundingClientRect();
      
      gsap.to(".palochka", {
        duration: 0.1,
        left: indicatorStyle.left,
        width: buttonRect.width,
        onComplete: () => { setIndicatorStyle({left:(indicatorStyle.left+button.offsetLeft)/2}),
          gsap.to(".palochka", {
            duration: 0.1,
            width: buttonRect.width+((Math.max(indicatorStyle.left, button.offsetLeft)-Math.min(indicatorStyle.left, button.offsetLeft))*8),
            ease: "back.inOut",
            onComplete: () => {setIndicatorStyle({left:button.offsetLeft}),
              gsap.to(".palochka", {
                duration: 0.1,
                width: buttonRect.width,
              });
            },
          });
        },
      });

      /*setIndicatorStyle({
        width: `${buttonRect.width}px`,
        left: `${button.offsetLeft}px`,
      });*/
    }
  }, [activeButton]);

  return (
    <footer style={{ bottom: '-50px' }}>
      <nav className={styles.footerContainer}>
        <div onClick={() => navigateWithDelay("/upgrade/main")}>
          <button 
            ref={(el) => (buttonRefs.current[0] = el)}
            className={`${styles.footerButton} ${activeButton === 1 ? styles.active : ''}`}
            onClick={() => handleButtonClick(1)}
          >
            <Image src="/upgrade.svg" width={30} height={30} alt="Upgrade Icon" />
          </button>
        </div>

        <div onClick={() => navigateWithDelay("/leader")}>
          <button 
            ref={(el) => (buttonRefs.current[1] = el)}
            className={`${styles.footerButton} ${activeButton === 2 ? styles.active : ''}`}
            onClick={() => handleButtonClick(2)}
          >
            <Image src="/leaderboard.svg" width={30} height={30} alt="Leader Icon" />
          </button>
        </div>

        <div onClick={() => navigateWithDelay("/")}>
          <button 
            ref={(el) => (buttonRefs.current[2] = el)}
            className={`${styles.footerButton} ${activeButton === 3 ? styles.active : ''}`}
            onClick={() => handleButtonClick(3)}
          >
            <Image src="/mine.svg" width={30} height={30} alt="Mine Icon" />
          </button>
        </div>

        <div onClick={() => navigateWithDelay("/invite")}>
          <button 
            ref={(el) => (buttonRefs.current[3] = el)}
            className={`${styles.footerButton} ${activeButton === 4 ? styles.active : ''}`}
            onClick={() => handleButtonClick(4)}
          >
            <Image src="/invite.svg" width={30} height={30} alt="Invite Icon" />
          </button>
        </div>

        <div onClick={() => navigateWithDelay("/task")}>
          <button 
            ref={(el) => (buttonRefs.current[4] = el)}
            className={`${styles.footerButton} ${activeButton === 5 ? styles.active : ''}`}
            onClick={() => handleButtonClick(5)}
          >
            <Image src="/tasks.svg" width={30} height={30} alt="Task Icon" />
          </button>
        </div>
      </nav>
      <div className={`palochka ${styles.indicator}`} style={indicatorStyle} />
    </footer>

  );
}

export default Footer;
