import css from "./style.css"
import Image from "next/image"
import avatar from "../assets/avatar.jpg"

export default function Farm() {
    return  (
        <main>
            <div className="clicker-content">
                <div className="stats-container">
                    <div className="profile">
                        <Image src={avatar} width={50} height={50} style={{borderRadius:50}}></Image>
                        <h1>NekoAnime</h1>
                        <h1>#1</h1>
                    </div>
                    <div className="stats">
                        <div className="block1"></div>
                        <div className="block2"></div>
                        <div className="block3"></div>
                        <div className="block4"></div>
                    </div>
                </div>
                <div className="clicker-container"></div>
            </div>
        </main>
    )
}