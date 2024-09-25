'use client'

import Image from "next/image"
import styles from './Header.module.css'
import { Grid2 } from "@mui/material"
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import useUserStore from "@/src/Store/userStore"


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
  const { userData, photoUrl } = useUserStore(); // состояние и метод для обновления состояния

  console.log(userData)
  // Если данные еще загружаются, возвращаем состояние загрузки

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
            <h1>{userData?.tgUser?.username || 'Guest'}</h1> {/**/}
          </div>
          <div className={styles.place}>
            <h1>#1</h1>
          </div>
        </div>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid2 size={6}>
            <Item>
              <Image src={'/perhour.svg'} width={22} height={22}></Image>
              <h3>{userData.user.income} / h</h3> {/* отут короче надо будет чтоб с базы данных MongoDB бралось */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/invite.svg'} width={22} height={22}></Image>
              <h3>{userData.user.friendsInvited}</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/pertap.svg'} width={22} height={22}></Image>
              <h3>+{userData.user.pointsPerTap}</h3> {/* MongoDB */}
            </Item>
          </Grid2>
          <Grid2 size={6}>
            <Item>
              <Image src={'/paskocoin.png'} width={22} height={22}></Image>
              <h3>{userData.user.points}</h3>
            </Item>
          </Grid2>
        </Grid2>

      </div>

      
    </header>
  )
}

export default Header