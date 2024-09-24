'use client'

import Image from "next/image"
import styles from './Header.module.css'
import { getUserData } from "@/src/utils/getUserData"
import { useEffect } from "react"
import { Grid2 } from "@mui/material"
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'


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
  let userData = getUserData().initData
  let userDataRaw = getUserData().initDataRaw
  let photoUrl = getUserData().photoUrl

  useEffect(() => { //надо потом убрать
    console.log(userData)
    //нужно как-то получить аватарку
  }, [userData])

  return(
    <header className={styles.header}>
      <div className={styles.statsContainer}>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <Image src={photoUrl} width={35} height={35} style={{borderRadius:50}} />
            <h1>{userData.user?.username}</h1> {/**/}
          </div>
          <div className={styles.place}>
            <h1>#1</h1>
          </div>
        </div>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid2 size={6}>
            <Item>
              <Image src={'/perhour.svg'} width={22} height={22}></Image>
              <h3>9,99M / h</h3> {/* отут короче надо будет чтоб с базы данных MongoDB бралось */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/invite.svg'} width={22} height={22}></Image>
              <h3>0</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/pertap.svg'} width={22} height={22}></Image>
              <h3>+999</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/paskocoin.png'} width={22} height={22}></Image>
              <h3>999T</h3>
            </Item>
          </Grid2>
        </Grid2>

      </div>

      
    </header>
  )
}

export default Header