import Image from 'next/image';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <nav className={styles.footerContainer}>
        <Link href="/upgrade" passHref>
          <button className={styles.footerButton}>
            <Image src={'/upgrade.png'} width={40} height={40} alt="Upgrade Icon" />
          </button>
        </Link>

        <Link href="/leader" passHref>
          <button className={styles.footerButton}>
            <Image src={'/leaderboard.png'} width={40} height={40} alt="Leader Icon" />
          </button>
        </Link>

        <Link href="/" passHref>
          <button className={styles.footerButton}>
            <Image src={'/mine.png'} width={40} height={40} alt="Mine Icon" />
          </button>
        </Link>

        <Link href="/invite" passHref>
          <button className={styles.footerButton}>
            <Image src={'/invite.png'} width={40} height={40} alt="Invite Icon" />
          </button>
        </Link>

        <Link href="/task" passHref>
          <button className={styles.footerButton}>
            <Image src={'/tasks.png'} width={40} height={40} alt="Task Icon" />
          </button>
        </Link>
      </nav>
    </footer>
  );
}

export default Footer