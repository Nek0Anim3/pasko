import Footer from "@/src/Components/ui/Footer/Footer";
import Header from "@/src/Components/ui/Header/Header";
import { getUserData } from "@/src/utils/getUserData";


export default function Layout({ children }) {
  getUserData

  return (
    <>
      <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </>
  );
}
