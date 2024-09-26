import Header from "@/src/Components/ui/Header/Header";
import Footer from "@/src/Components/ui/Footer/Footer";

export default function Layout({ children }) {

  /*
  fetch("api/user/putUser", {
    method: "POST",
    body: JSON.stringify({ uid: userData.user.uid , points }), // Корректный формат данных
    headers: {
      "Content-Type": "application/json",
    },
  })
  */

  

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
