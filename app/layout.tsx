import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./Components/Header/Header";
import Aside from "./Components/Aside/Aside";
import styles from "./layout.module.css";
import RecoilWrapper from "./Components/RecoilWrapper/RecoilWrapper";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "muse-admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    //     <Header />
    //     <div className={styles.wrapper}>
    //       <Aside />

    //       {children}
    //     </div>
    // </body>
    // </html>

    
      <html lang="en">
          <body className={inter.className}>
              <RecoilWrapper>
                  {children}
              </RecoilWrapper>
          </body>
      </html>
  
  );
}
