"use client"

import gsap from "gsap"
import styles from './Loader.module.css'
import { useEffect, useState } from "react"
import useUserStore from "@/src/Store/userStore"
import { getUserData } from "@/src/utils/getUserData"
import useLoadingStore from "@/src/Store/loadingStore"
import { initMiniApp } from '@telegram-apps/sdk';

const Loader = () => {
  const [miniApp, setMiniApp] = useState(null);
  const {isLoading, setUser} = useUserStore()
  const {setLoading} = useLoadingStore()
  const [newUser, setNewUser] = useState()

  useEffect(() => {
    const initializeMiniApp = async () => {
      try {
        const app = await initMiniApp()[0];
        setMiniApp(app);
        console.log(app)
      } catch (error) {
        console.error("Failed to initialize miniApp:", error);
      }
    };
    initializeMiniApp();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData();
      if (data) {
        const { initData, user, avatarUrl, isNew } = data;
        console.log(initData)
        setNewUser(isNew || false);
        setUser({ user, tgUser: initData.user }, avatarUrl);
      }
    };
    fetchUser();
  }, [setUser]);

  useEffect(() => {
    if (miniApp) {
      miniApp.setHeaderColor('#0a0a0a');
    }
  }, [miniApp]);

  useEffect(() => {
    function animate() {
      const timeline = gsap.timeline()

      // Анимация текста и интро
      timeline.to('.textAnim1', { duration: 0.5, opacity: 0, delay: 1 })
       
      if(newUser) {
        timeline.fromTo('.introAnim', { top: "-100vh" }, { top: 0, duration: 1, ease: "power4.out" })
        timeline.to(".mainPart", { zIndex: -1 })
        timeline.from(".text", { duration: 0.8, skewY: 20, y: 100, x: -200, opacity: 0, ease: "power4.inOut" })
        timeline.fromTo(".introAnim", { backgroundColor: "white", color: 'black' }, { delay: 1, backgroundColor: "#0a0a0a", color: "white", duration: 1, ease: "power4.inOut" })
        timeline.to(".text", { duration: 0.8, skewY: -20, y: 100, x: 200, opacity: 0, ease: "power4.inOut" })
      }
      // Скрываем лоадер по завершению
      timeline.to(".loader", {
        opacity: 0,
        duration: 0.2,
        delay: 0.4,
        ease: "power1.in",
        zIndex: -1,
        display: "none",
        onStart: () => setLoading(false)
      });
      //timeline.to(".loader", {display: "none"})
    }

    if (!isLoading) animate()
  }, [isLoading, setLoading])



  return (
    <>
      <div className={`loader ${styles.loader}`}>
        <div className={`mainPart ${styles.animation}`}>
          <h1 className={`textAnim1 ${styles.loadingText}`}>LOADING</h1>
          {/*<div className={`progress ${styles.progress}`}></div>  Прогресс бар */}
        </div>
        <div className={`introAnim ${styles.intro}`}>
          <p className="text">HuetaXColhoz</p>
        </div>
      </div>
    </>
  )
}

export default Loader