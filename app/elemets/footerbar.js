
import Image from 'next/image';
import './footer.css';
import upgrade from '../assets/upgrade.png';
import leader from '../assets/leaderboard.png';
import mine from '../assets/mine.png';
import invite from '../assets/invite.png';
import task from '../assets/tasks.png';


export default function FooterBar() {
  return (
    <main>
        <div className="foot-cont">
        <button className="upgrade-but">
          <Image src={upgrade} width={32} height={32} alt="Upgrade Icon" />
        </button>
        <button className="leader-but">
          <Image src={leader} width={32} height={32} alt="Leader Icon" />
        </button>
        <button className="mine-but">
          <Image src={mine} width={38} height={38} alt="Mine Icon" />
        </button>
        <button className="invite-but">
          <Image src={invite} width={32} height={32} alt="Invite Icon" />
        </button>
        <button className="task-but">
          <Image src={task} width={32} height={32} alt="Task Icon" />
        </button>
        </div>
    </main> 

  );
}
