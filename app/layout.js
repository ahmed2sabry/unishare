import "@/app/_styles/globals.css";
import { Roboto } from "next/font/google";
import AuthProvider from "./_lib/providers/AuthProvider";
import DesktopNavBar from "./_components/DesktopNavBar";
import MobileNavBar from "./_components/MobileNavBar";
import { TanstackProvider } from "./_lib/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Footer from "./_components/Footer";
import Spinner from "./_components/Spinner";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / unishare",
    default: "welcome / unishare",
  },
  description:
    "UniShare is a student-to-student marketplace that allows university students to rent and share academic tools and equipment. Students from majors like dentistry, engineering, and more can save money by renting tools for a semester instead of buying expensive new ones. UniShare helps build a collaborative campus community where students easily list, discover, and rent essential study equipment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} min-h-screen`}>
        <TanstackProvider>
          <>{children}</>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "5000px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </TanstackProvider>
      </body>
    </html>
  );
}
