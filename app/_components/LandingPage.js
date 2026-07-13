"use client";

import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

import { IoIosSearch } from "react-icons/io";
import Link from "next/link";

import { useEffect } from "react";
import Footer from "./Footer";

export default function LandinPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleOpen = (index) => {
    setOpenIndex((open) => (open === index ? null : index));
  };
  const faqs = [
    {
      id: 1,
      question: "Who can use UniShare?",
      answer:
        "UniShare is available exclusively for verified university students. You can create an account using your university email to join the community.",
    },
    {
      id: 2,
      question: "How do I rent a tool?",
      answer:
        "Browse available tools, select your rental dates, send a request, and wait for the owner's approval. Once approved, you'll collect the tool using QR verification.",
    },
    {
      id: 3,
      question: "How is the rental process secured?",
      answer:
        "Every rental is protected through university email verification, QR code confirmation, tool condition documentation, and user reviews.",
    },
    {
      id: 4,
      question: "What happens if the tool is damaged?",
      answer:
        "The owner can report any issues by uploading photos and submitting an issue report. The security deposit will be reviewed based on the reported condition.",
    },
    {
      id: 5,
      question: "Can I rent out my own tools?",
      answer:
        "Yes! You can list your academic tools, set the rental price, upload photos, and start receiving rental requests from verified students.",
    },
    {
      id: 6,
      question: "When do I pay for the rental?",
      answer:
        "Payment details are provided once your rental request is approved. The payment process may vary depending on the agreed rental arrangement.",
    },
  ];
  const steps = [
    {
      id: 1,
      title: "Find a Tool",
      desc: "Browse thousands of academic tools from verified university students.",
    },
    {
      id: 2,
      title: "Choose Rental Dates",
      desc: "Select the rental period that fits your schedule.",
    },
    {
      id: 3,
      title: "Send a Request",
      desc: "Request the tool and wait for the owner's approval.",
    },
    {
      id: 4,
      title: "Pick Up & Verify",
      desc: "Meet the owner, scan the QR code, and confirm the tool's condition.",
    },
    {
      id: 5,
      title: "Return & Review",
      desc: "Use the tool, return it on time, and leave a review to help the community.",
    },
  ];

  return (
    <>
      <Nav />
      <MobileNav />
      <div className="flex flex-col">
        {/* hero section */}
        <section
          id="home-section"
          className="min-h-[calc(100vh-5.25rem)] bg-[#EDF4FA] relative overflow-hidden mb-16.5"
        >
          <div className=" max-w-3xl mx-auto flex flex-col items-center justify-center gap-4 text-center px-4 pt-10">
            <h1 className=" text-3xl lg:text-4xl font-bold text-black">
              Rent Everything You Need for University, Easily and Securely.
            </h1>
            <p className="text-lg lg:text-xl  text-gray-light font-normal">
              A trusted platform where university students can rent and share
              academic tools easily, securely, and at an affordable cost.
            </p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block z-40 bg-primary-500 text-white font-medium  px-12 py-3 rounded-3xl  hover:bg-primary-600 transition-all duration-300 cursor-pointer"
            >
              Download App
            </a>
          </div>
          <img
            src="/left-hero.png"
            alt="the app on the mobile"
            className="absolute -rotate-12 top-[330px] left-[28%] w-[352px] z-20 hidden lg:block"
          />
          <img
            src="/right-hero.png"
            alt="the app on the mobile"
            className="absolute rotate-12 top-[330px] left-[50%] w-[352px] z-30 hidden lg:block"
          />
          <div className="rounded-4xl hidden md:block absolute lg:top-[51%] lg:left-[14%] bg-white  px-3 w-48.75 py-2  text-base font-medium text-center top-[60%] left-[10%]  ">
            <p>
              4.5
              <br />
              Average rating
            </p>
          </div>
          <div className=" hidden rounded-4xl md:block  absolute top-[85%] left-[73%] bg-white  px-3 w-37.5 py-2  text-base font-medium text-center  ">
            +10K users
          </div>
          <div className="rounded-4xl hidden absolute top-[78%] left-[12%] p-5.5 md:flex items-center gap-2.5 bg-white">
            <img
              src="/qrcode-hero.svg"
              alt="qr code icon"
              className="self-start"
            />
            <div className="space-x-1.25">
              <h3 className="text-primary-500 font-semibold text-xl ">
                QR Code Pickup
              </h3>
              <p className="font-normal text-sm  leading-4.5 text-[#434652]">
                Verify every pickup and <br /> return with secure QR <br />
                scanning.
              </p>
            </div>
          </div>
          <div className="hidden  rounded-4xl absolute lg:top-[43%] lg:left-[73%] p-5.5 md:flex items-center gap-2.5 bg-white  md:left-[55%] md:top-[55%]  ">
            <img
              src="/check-hero.svg"
              alt="qr code icon"
              className="self-start"
            />
            <div className="space-x-1.25">
              <h3 className="text-primary-500 font-semibold text-xl ">
                University Verified
              </h3>
              <p className="font-normal text-sm  leading-4.5 text-[#434652]">
                Only students with .edu <br />
                emails can join the <br />
                community.
              </p>
            </div>
          </div>
        </section>
        {/* why */}
        <section
          id="why-section"
          className=" mb-26 px-2 lg:px-20 flex flex-col gap-12 items-center text-center"
        >
          <div>
            <h2 className="font-bold text-4xl mb-3">Why UniShare?</h2>
            <p className="text-base font-medium text-gray-light">
              Designed to make renting and sharing academic tools simple,
              secure, and <br /> accessible for every student.
            </p>
          </div>
          <div className="self-stretch grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-x-6 gap-y-8">
            {/* item 1  */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img
                src="/why-verified.svg"
                alt="verified icon"
                className="mb-8"
              />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Verified Students
              </h3>
              <p className="text-gray-light font-normal text-xl">
                Only university-verified students can rent and lend tools,
                creating a trusted campus community.
              </p>
            </div>
            {/* item 2 */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img
                src="/why-affordable.svg"
                alt="verified icon"
                className="mb-8"
              />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Affordable Rentals
              </h3>
              <p className="text-gray-light font-normal text-xl">
                Access expensive academic tools at a fraction of the purchase
                cost, Save your Money.
              </p>
            </div>
            {/* item 3 */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img src="/why-secure.svg" alt="verified icon" className="mb-8" />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Secure Process
              </h3>
              <p className="text-gray-light font-normal text-xl">
                QR verification, tool condition documentation, and rental
                tracking ensure a safe experience.
              </p>
            </div>
            {/* item 4 */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img
                src="/why-trusted.svg"
                alt="verified icon"
                className="mb-8"
              />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Trusted Reviews
              </h3>
              <p className="text-gray-light font-normal text-xl">
                Read honest ratings and reviews about tool and owner before
                renting from other students.
              </p>
            </div>
            {/* item 5  */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img src="/why-issue.svg" alt="verified icon" className="mb-8" />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Issue Reporting
              </h3>
              <p className="text-gray-light font-normal text-xl">
                Report damaged items with photo evidence to ensure fair dispute
                resolution and protect all.
              </p>
            </div>
            {/* item 6 */}
            <div className="bg-[#EDF4FA] p-10 flex flex-col items-center rounded-3xl">
              <img src="/why-smart.svg" alt="verified icon" className="mb-8" />
              <h3 className="font-medium text-4xl text-primary-500 mb-4 ">
                Smart System
              </h3>
              <p className="text-gray-light font-normal text-xl">
                Stay on track with request updates, reminders, and rental status
                notifications.
              </p>
            </div>
          </div>
        </section>
        {/* how it works */}
        <section
          id="how-section"
          className="flex flex-col gap-12 items-center text-center mb-24"
        >
          <div>
            <h2 className="font-bold text-4xl mb-3">How It Works?</h2>
            <p className="text-base font-medium text-gray-light">
              Renting academic tools has never been easier. Follow these
              <br /> simple steps to get started.
            </p>
          </div>
          <div className="relative self-end w-full lg:w-3/4 h-176 bg-primary-500 md:rounded-bl-[5rem] flex md:rounded-tl-[5rem] items-center justify-center">
            <img
              src="/holding-phone.png"
              alt="holding phone"
              className="hidden h-144.5 xl:block  absolute z-20 -left-100 bottom-0"
            />

            <ul className="flex flex-col pl-8 pt-8 md:pl-12 md:pt-12">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`relative flex gap-8 pb-10 md:pb-14 pl-8 md:pl-14 text-left ${
                    index !== steps.length - 1
                      ? "border-l border-white"
                      : "border-l border-transparent"
                  }`}
                >
                  <div className="absolute w-10 h-10 -left-5  md:-left-7.5 top-0 flex md:h-15 md:w-15 items-center justify-center rounded-full bg-white text-lg md:text-xl font-medium text-primary-500 shadow-md">
                    {step.id}
                  </div>

                  <div className="pt-1">
                    <h3 className=" text:xl md:text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-lg md:text-xl font-normal text-white/85">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* categories */}
        <section
          id="categories-section"
          className=" mb-35 px-2 lg:px-20 flex flex-col gap-12 items-center text-center"
        >
          <div>
            <h2 className="font-bold text-4xl mb-3">Browse by Category</h2>
            <p className="text-base font-medium text-gray-light">
              Explore a wide range of academic tools across different fields and
              <br />
              find exactly what you need for your studies.
            </p>
          </div>
          {/* grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] */}
          <div className=" self-stretch grid  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 2xl:grid-cols-4 ">
            {/* item 1 */}
            <div className="shadow-[0_0_30px_0_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex flex-col hover:scale-110 transition-all duration-300">
              <img
                src="/category-engineer.jpg"
                alt="category engineering"
                className="h-67.5 "
              />
              <div className="text-center py-6 text-3xl font-medium">
                Engineering
              </div>
            </div>
            {/* item 2 */}
            <div className="shadow-[0_0_30px_0_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex flex-col hover:scale-110 transition-all duration-300">
              <img
                src="/category-medical.jpg"
                alt="category medical"
                className="h-67.5"
              />
              <div className="text-center py-6 text-3xl font-medium">
                Medical
              </div>
            </div>
            {/* item 3 */}
            <div className="shadow-[0_0_30px_0_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex flex-col hover:scale-110 transition-all duration-300">
              <img
                src="/category-art.jpg"
                alt="category arts"
                className="h-67.5"
              />
              <div className="text-center py-6 text-3xl font-medium">Arts</div>
            </div>
            {/* item 4 */}
            <div className="shadow-[0_0_30px_0_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex flex-col hover:scale-110 transition-all duration-300">
              <img
                src="/category-book.jpg"
                alt="category books"
                className="h-67.5 "
              />
              <div className="text-center py-6 text-3xl font-medium">Books</div>
            </div>
          </div>
        </section>
        {/* section FAQ */}
        <section
          id="faq-section"
          className="  px-2 lg:px-20 flex flex-col gap-12 items-center text-center"
        >
          <div>
            <h2 className="font-bold text-4xl mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base font-medium text-gray-light">
              Find answers to the most common questions about renting and <br />
              sharing academic tools.
            </p>
          </div>
          <ul className="flex flex-col gap-6 self-stretch">
            {faqs.map((faq) => {
              const isOpen = openIndex === faq.id;
              return (
                <li
                  key={faq.id}
                  onClick={() => toggleOpen(faq.id)}
                  className="bg-[#EDF4FA]  flex flex-col gap-2 md:gap-4 rounded-3xl px-4 py-3  md:px-10 md:py-6 cursor-pointer"
                >
                  <div className=" flex items-center justify-between">
                    <h3 className="text-primary-500 text-lg md:text-2xl font-semibold">
                      {faq.id}. {faq.question}
                    </h3>
                    <IoIosArrowForward
                      className={`text-primary-500 text-lg md:text-2xl  transition-all duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}
                    />
                  </div>

                  {/* answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 "
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="overflow-hidden text-primary-500 font-medium text-sm md:text-xl text-left">
                      {faq.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
}

function Nav() {
  return (
    <nav className=" hidden md:block sticky top-0 z-50 bg-white shadow-sm px-8 lg:px-20 md:py-5.75 py-2">
      <ul className=" flex  text-lg font-normal items-center justify-between gap-8  ">
        <li>
          <a
            href="#home-section"
            className="hover:text-primary-500 transition-colors"
          >
            <img
              src="/app-logo.svg"
              alt="UniShare Logo"
              className="md:w-32 w-24 "
            />
          </a>
        </li>
        {/* links */}

        <div className="  flex gap-4 md:gap-9 lg:gap-16 items-center text-sm lg:text-lg font-medium">
          {/* <li>
            <a
              href="/saved"
              className="hover:text-primary-500 transition-colors "
            >
              Home
            </a>
          </li> */}
          <li>
            <a
              href="#why-section"
              className="hover:text-primary-500 transition-colors "
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-section"
              className="hover:text-primary-500 transition-colors "
            >
              How it Works
            </a>
          </li>
          <li>
            <a
              href="#categories-section"
              className="hover:text-primary-500 transition-colors "
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href="#faq-section"
              className="hover:text-primary-500 transition-colors "
            >
              FQA
            </a>
          </li>
        </div>
        {/* <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f5f5]  transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none ">
            <IoIosSearch className="text-gray-light shrink-0" size={20} />

            <input
              type="text"
              placeholder="Search for tools, equipment..."
              className="w-full bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-light placeholder:text-base font-normal "
            />
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden md:block font-medium text-base px-4 py-2"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="font-medium text-base px-4 py-2 text-white bg-primary-500 transition-all duration-200 hover:bg-primary-600 rounded-3xl"
          >
            Sign up
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Features", href: "#why-section" },
    { name: "How it Works", href: "#how-section" },
    { name: "Categories", href: "#categories-section" },
    { name: "FAQ", href: "#faq-section" },
  ];

  return (
    <div className=" md:hidden">
      <div className="fixed top-0 left-0 z-[60] w-full flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-4 shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[70] w-8 h-8 cursor-pointer flex justify-center items-center group"
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-primary-500 transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        <Link href="/" onClick={() => setIsOpen(false)}>
          <img src="/app-logo.svg" alt="Logo" className="w-28" />
        </Link>

        <Link
          href="/auth/signup"
          className="font-medium text-sm px-4 py-2 text-white bg-primary-500 transition-all duration-200 hover:bg-primary-600 rounded-3xl"
        >
          Sign up
        </Link>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav
        className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[55] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="pt-24 p-6 h-full flex flex-col justify-between">
          <ul className="flex flex-col gap-4 text-lg font-semibold text-gray-800">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 hover:bg-gray-50 rounded-xl transition-colors active:bg-primary-50 hover:text-primary-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mb-8">
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="w-full font-medium text-base text-center py-2.5 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => setIsOpen(false)}
              className="w-full font-medium text-base text-center py-2.5 text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-[68px]"></div>
    </div>
  );
}
