import localFont from "next/font/local";
import "./globals.css";
import Loader from "../Components/ui/Loader/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pasko Combat",
  description: "Farm , upgrade and customize your own pasko",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Loader />
        
        {children}
      </body>
    </html>
  );
}
