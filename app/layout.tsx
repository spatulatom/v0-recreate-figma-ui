import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whitepace - Project Management Tool",
  description: "A modern project management tool for teams",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add this script to prevent theme flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageKey = 'whitepace-theme';
                  var classNameDark = 'dark';
                  var storedTheme = localStorage.getItem(storageKey);
                  if(!storedTheme) {
                    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }

                  // Determine if dark class should be applied
                  if (storedTheme === 'dark' || (systemPrefersDark && (storedTheme === 'system' || !storedTheme))) {
                    document.documentElement.classList.add(classNameDark);
                    // If dark class was applied AND localStorage was initially empty AND system prefers dark,
                    // then store 'system' in localStorage to make subsequent loads more direct.
                    if (!storedTheme && systemPrefersDark) {
                      localStorage.setItem(storageKey, 'system');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="whitepace-theme">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

// import type React from "react"
// import "./globals.css"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Whitepace - Project Management Tool",
//   description: "A modern project management tool for teams",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         {/* Add this script to prevent theme flashing */}
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (function() {
//                 try {
//                   var theme = localStorage.getItem('whitepace-theme');
//                   if (theme === 'dark' || (theme === 'system' && 
//                       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//                     document.documentElement.classList.add('dark');
//                   }
//                 } catch (e) {}
//               })();
//             `,
//           }}
//         />
//       </head>
//       <body className={inter.className}>
//         <ThemeProvider defaultTheme="system" storageKey="whitepace-theme">
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
