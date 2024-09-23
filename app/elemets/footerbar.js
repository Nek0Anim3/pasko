
import Image from 'next/image';
import './footer.css';
import upgrade from '../assets/upgrade.png';
import leader from '../assets/leaderboard.png';
import mine from '../assets/mine.png';
import invite from '../assets/invite.png';
import task from '../assets/tasks.png';
import Link from 'next/link';

export default function FooterBar() {
  return (
    <main>
      <div className="foot-cont">
        <Link href="/upgrade" passHref>
          <button className="upgrade-but">
            <Image src={upgrade} width={40} height={40} alt="Upgrade Icon" />
          </button>
        </Link>

        <Link href="/leader" passHref>
          <button className="leader-but">
            <Image src={leader} width={40} height={40} alt="Leader Icon" />
          </button>
        </Link>

        <Link href="/" passHref>
          <button className="mine-but">
            <Image src={mine} width={40} height={40} alt="Mine Icon" />
          </button>
        </Link>

        <Link href="/invite" passHref>
          <button className="invite-but">
            <Image src={invite} width={40} height={40} alt="Invite Icon" />
          </button>
        </Link>

        <Link href="/task" passHref>
          <button className="task-but">
            <Image src={task} width={40} height={40} alt="Task Icon" />
          </button>
        </Link>
      </div>
    </main>

  );
}
