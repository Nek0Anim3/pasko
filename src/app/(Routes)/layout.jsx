import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import { getUserData } from "@/src/utils/getUserData";


export default function Layout({ children }) {

  let username = getUserData().username

  return (
    <>
      <Header />
      <div className="content">
        {children}

        {username}
      </div>
      <Footer />
    </>
  );
}
