
import Image from 'next/image';
import './footer.css';
import upgrade from '../assets/upgrade.png'


export default function FooterBar() {
  return (
    <main>
        <div className="foot-cont">
            <button className='upgrade-but'><Image src={upgrade} width={50} height={50}></Image></button>
            <button className='leader-but'>LE</button>
            <button className='mine-but'>MINE</button>
            <button className='invite-but'>IN</button>
            <button className='task-but'>TA</button>
        </div>
    </main> 

  );
}
