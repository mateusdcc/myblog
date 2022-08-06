import '../styles/globals.css'
import Link from "next/link";
import React, { useState } from 'react';
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const [isToggled, setIsToggled] = useState(false);
  const toggleButtonText = () => {
    setIsToggled(!isToggled);
    localStorage.setItem('isToggled', !isToggled);
  }

  const toggleTheme = () => {
    if (process.browser) {
      const theme = document.querySelector("html").getAttribute("data-theme");
      if (theme === "retro") {
        document.querySelector("html").setAttribute("data-theme", "halloween");
      } else {
        document.querySelector("html").setAttribute("data-theme", "retro");
      }
      toggleButtonText();
    }
  }

  React.useEffect(() => {
    if (process.browser) {
      const theme = localStorage.getItem("isToggled");
      if (theme === "true") {
        document.querySelector("html").setAttribute("data-theme", "retro");
      } else {
        document.querySelector("html").setAttribute("data-theme", "halloween");
      }
      setIsToggled(theme === "true");
    }
  } , []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (process.browser) {
      if (isOpen) {
        document.getElementById("menu-button").blur();
      }
    }
  }

  return (
    <>
      <Head>
        <title>MateusDCC Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    { /* Navbar */ }
      <div className="navbar bg-base-300">
        <div className="flex-1 justify-between">
          { /* Theme toggle */ }
          <button className="btn btn-square btn-outline" onClick={toggleTheme}>
            {isToggled ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            )}
          </button>
          { /* "Logo" */ }
          <Link href="/">
            <div className="btn btn-outline normal-case text-xl">
              MateusDCC
            </div>
          </Link>
          { /* Social Media Links */ }
          <div className="flex-none dropdown dropdown-left">
            <button onClick={toggleMenu} id="menu-button" tabIndex={0} className="transition-opacity btn btn-square h-10 max-h-max btn-outline">
          { isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block animate-pulse w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
              )}
            </button>
              <ul id="dropdown" tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href='https://github.com/mateusdcc' target="_blank" >GitHub</a></li>
                <li><a href='https://mateusdcc.github.io' target="_blank" >Home Site</a></li>
              </ul>
          </div>
        </div>
      </div>

      { /* Hero */ }
      <div className="hero pt-5 pb-5 bg-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">My Blog!</h1>
          </div>
        </div>
      </div>

      <NextNProgress
        color="#29D"
        startPosition={0.6}
        stopDelayMs={100}
        height={2}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
