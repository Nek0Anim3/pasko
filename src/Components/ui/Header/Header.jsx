'use client'

import Image from "next/image"
import styles from './Header.module.css'
import { getUserData } from "@/src/utils/getUserData"
import { useEffect, useState } from "react"
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
  const [userData, setUserData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const data = getUserData();
    //console.log("User data:", data); // Выводим данные для отладки
    setUserData(data.initData);

    const fetchAvatar = async () => {
      try {
        const response = await fetch("/api/avatar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Укажите тип содержимого
          },
          body: JSON.stringify({ uid: data.initData.user.id }), // Сериализуйте объект в JSON
        });
  
        const result = await response.json();
        setPhotoUrl(result.avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };
  
    fetchAvatar();

  }, []); // Запускаем только один раз при монтировании

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
            <h1>{userData?.user?.username || 'Guest'}</h1> {/**/}
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