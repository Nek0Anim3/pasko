'use client'

import Image from "next/image"
import styles from './Header.module.css'
import { getUserData } from "@/src/utils/getUserData"
import { useEffect } from "react"

const Header = () => {
  let userData = getUserData().initData

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return(
    <header className={styles.header}>
      <div className={styles.statsContainer}>
        <div className={styles.userInfo}>
          <Image src="/avatar.jpg" width={50} height={50} style={{borderRadius:50}} />
          <h1>{userData.user?.username}</h1> {/*Бро низя больше 1 тега h1 на странице айайай*/}
          <h1>#1</h1>
        </div>

        <div className="stats">
          <div className="block1"></div>
          <div className="block2"></div>
          <div className="block3"></div>
          <div className="block4"></div>
        </div>
      </div>
    </header>
  )
}

export default Header