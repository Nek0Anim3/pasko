'use client'

import Image from "next/image"
import styles from './Header.module.css'
import { Grid2 } from "@mui/material"
import { easing, styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import useUserStore from "@/src/Store/userStore"
import abbreviateNumber from "@/src/utils/abbreviateNumber"
import { useEffect } from "react"
import gsap from "gsap"
import useLoadingStore from "@/src/Store/loadingStore"


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#2b2727',
  ...theme.typography.body2,
  borderRadius: 16,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  gap: '2vw',
  justifyContent: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Header = () => {
  const { userData, photoUrl, isLoading } = useUserStore(); // состояние и метод для обновления состояния
  // Если данные еще загружаются, возвращаем состояние загрузки
  const {isLoadingAnim} = useLoadingStore()

  useEffect(() => {
    function animate () {
      gsap.fromTo(".userInfoCard", {scale: 0}, {scale: 1, duration: 0.5, ease: "expo.inOut", delay: .1}) //нихуёво да (спиздил у хомяка)
      gsap.fromTo("header", {y: -200}, {y: 0, duration: 0.5, ease: "power4.out"}) //нихуёво да (спиздил у хомяка)
    }

    if(!isLoadingAnim) animate()
    
  },[isLoadingAnim])

  if(isLoading) return <></>

  return (
    <header className={styles.header}>
      <div className={styles.statsContainer}>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            {photoUrl ? (
              <Image
                src={photoUrl}
                width={35}
                height={35}
                style={{ borderRadius: '50%' }}
                alt="User Avatar"
              />
            ) : (
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: '50%',
                  backgroundColor: '#ccc',
                }}
              /> // Заглушка для аватара
            )}
            <h1>{userData?.tgUser?.first_name || 'Guest'}</h1> {/**/}
          </div>
          <div className={styles.place}>
            <h1>#1</h1>
          </div>
        </div>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid2 size={6}>
            <Item className="userInfoCard">
              <Image src={'/perhour.svg'} width={22} height={22}></Image>
              <h3>{abbreviateNumber(userData.user.income)} / h</h3> {/* отут короче надо будет чтоб с базы данных MongoDB бралось */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item className="userInfoCard">
              <Image src={'/invite.svg'} width={22} height={22}></Image>
              <h3>{userData.user.friendsInvited}</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item className="userInfoCard">
              <Image src={'/pertap.svg'} width={22} height={22}></Image>
              <h3>+{abbreviateNumber(userData.user.pointsPerTap)}</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item className="userInfoCard">
              <Image src={'/paskocoin.png'} width={22} height={22}></Image>
              <h3>{abbreviateNumber(userData.user.points)}</h3>
            </Item>
          </Grid2>
        </Grid2>

      </div>

      
    </header>
  )
}

export default Header