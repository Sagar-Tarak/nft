import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main >{children}</main>{" "}
        {/* Added padding to avoid overlap */}
        <Footer/>
      </body>
    </html>
  );
}
