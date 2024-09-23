import Image from 'next/image';
import styles from './footer.css';
import leader from '../assets/leaderboard.png';
import mine from '../assets/mine.png';
import invite from '../assets/invite.png';
import task from '../assets/tasks.png';
import Link from 'next/link';

export default function FooterBar() {
  return (
    <main>
      <div className={styles.footerContainer}>
        <Link href="/upgrade" passHref>
          <button className={style.footerButton}>
            <Image src={'/upgrade.png'} width={40} height={40} alt="Upgrade Icon" />
          </button>
        </Link>

        <Link href="/leader" passHref>
          <button className={style.footerButton}>
            <Image src={leader} width={40} height={40} alt="Leader Icon" />
          </button>
        </Link>

        <Link href="/" passHref>
          <button className={style.footerButton}>
            <Image src={mine} width={40} height={40} alt="Mine Icon" />
          </button>
        </Link>

        <Link href="/invite" passHref>
          <button className={style.footerButton}>
            <Image src={invite} width={40} height={40} alt="Invite Icon" />
          </button>
        </Link>

        <Link href="/task" passHref>
          <button className={style.footerButton}>
            <Image src={task} width={40} height={40} alt="Task Icon" />
          </button>
        </Link>
      </div>
    </main>

  );
}
