import Layout from "../Components/layout"
import FooterBar from "./elemets/footerbar"
import Farm from "./farm/page"
import css from "./mainpage.css"

export default function Home() {
  return(
    <Layout>
        <div className="container">
          <div className="cont-main">
            <Farm></Farm>
          </div>
        </div>
    </Layout>
  )
}