"use client";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

function Footer() {
  const date = new Date().getFullYear();

  const shopCategories = [
    "Home",
    "Features",
    "How It Works",
    "Categories",
    "FAQ",
    "Tools",
  ];

  const customerService = [
    "Contact Us",
    "Return & Refund Policy",
    "Help Center",
    "Privacy Policy",
    "FAQs",
    "Terms & Conditions",
  ];

  const socialLinks = [
    {
      href: "https://www.tiktok.com",
      icon: FaTiktok,
      hoverColor: "hover:text-black",
    },
    {
      href: "https://www.instagram.com",
      icon: FaInstagram,
      hoverColor: "hover:text-[#E4405F]",
    },
    {
      href: "https://www.x.com",
      icon: FaXTwitter,
      hoverColor: "hover:text-black",
    },
    {
      href: "https://www.facebook.com",
      icon: FaFacebook,
      hoverColor: "hover:text-[#1877F2]",
    },
  ];

  return (
    <footer className="bg-primary-500 pt-16 pb-6 px-6 sm:px-12 lg:px-16 text-white border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* col 1 */}
        <div className="flex flex-col gap-4">
          <img
            src="/unishare-auth.svg"
            alt="UniShare Logo"
            className="w-36 h-auto select-none"
          />
          <p className="text-sm font-normal text-white/80 leading-relaxed max-w-sm">
            Making academic tools more accessible through a trusted university
            community.Making academic tools more accessible.
          </p>
        </div>

        {/* col 2 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base tracking-wide">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/70 font-normal">
            {shopCategories.map((item) => (
              <li
                key={item}
                className="hover:text-white transition-colors duration-200 cursor-pointer w-fit"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/*col 3*/}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-base tracking-wide">
            Customer Service
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/70 font-normal">
            {customerService.map((item) => (
              <li
                key={item}
                className="hover:text-white transition-colors duration-200 cursor-pointer w-fit"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* col 4 */}
        <div className="flex flex-col gap-6">
          {/* media */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-base tracking-wide">
              Social Media
            </h3>
            <ul className="flex flex-wrap gap-3.5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <li key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl group"
                    >
                      <Icon
                        className={`text-primary-500 ${social.hoverColor} transition-colors duration-300`}
                        size={20}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* downolad the app */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
            <h3 className="font-semibold text-xs tracking-wider text-white/80">
              DOWNLOAD THE APP
            </h3>

            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 w-fit backdrop-blur-sm shadow-inner">
              <div className="bg-white p-1.5 rounded-xl shrink-0 shadow-md">
                <img
                  src="/unishare-qrcode.svg"
                  alt="Download UniShare App QR"
                  className="w-16 h-16 select-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <a
                  href="https://www.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black/55 hover:bg-neutral-900/55 text-white px-3 py-1 rounded-lg transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <img
                    src="/apple-icon.svg"
                    alt="App Store"
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[8px] text-white/50 font-light">
                      Download on the
                    </span>
                    <span className="text-xs font-semibold tracking-tight">
                      Apple Store
                    </span>
                  </div>
                </a>

                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-black/55 hover:bg-neutral-900/55 text-white px-3 py-1 rounded-lg transition-all duration-200 border border-white/10 shadow-sm"
                >
                  <img
                    src="/google-play-store-icon.svg"
                    alt="Google Play"
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[8px] text-white/50 font-light">
                      GET IT ON
                    </span>
                    <span className="text-xs font-semibold tracking-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 flex justify-center">
        <p className="text-xs text-white/60 tracking-wider font-light">
          © {date} UniShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
