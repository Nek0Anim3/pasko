import FooterBar from "./elemets/footerbar"
import Farm from "./farm/page"
import css from "./mainpage.css"

export default function Home() {
  return(
    <main>
        <div className="container">
          <div className="cont-main">
            <Farm></Farm>
          </div>
          <div className="cont-foot">
            <FooterBar className='foot'></FooterBar>
          </div>
        </div>

    </main>
  )
}