import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import {
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiReact,
} from "react-icons/si";

// npm install gsap
// This version replaces Tailwind's animate-bounce / animate-pulse / animate-ping
// utility classes with GSAP timelines + loops, scoped to the section via
// gsap.context so everything is cleaned up automatically on unmount.

function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------- ENTRANCE TIMELINE (page load) ----------
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(
          ".hero-heading .line",
          { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 },
          "-=0.3"
        )
        .from(
          ".hero-paragraph",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".hero-quote",
          { x: -20, opacity: 0, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".hero-btn",
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.15 },
          "-=0.3"
        )
        .from(
          ".hero-tag",
          { y: 20, opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1 },
          "-=0.2"
        )
        .from(
          ".hero-orb",
          { scale: 0, opacity: 0, duration: 0.9, ease: "elastic.out(1, 0.6)" },
          "-=0.5"
        )
        .from(
          ".hero-float-label",
          { scale: 0, opacity: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" },
          "-=0.5"
        )
        .from(
          ".hero-point",
          { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
          "-=0.4"
        )
        .from(
          ".hero-snippet-1",
          { x: 60, opacity: 0, rotate: 6, duration: 0.6 },
          "-=0.5"
        )
        .from(
          ".hero-snippet-2",
          { x: -60, opacity: 0, rotate: -6, duration: 0.6 },
          "-=0.5"
        )
        .from(
          ".hero-dot",
          { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08 },
          "-=0.4"
        );

      // ---------- CONTINUOUS LOOPS (replace animate-bounce) ----------
      gsap.utils.toArray(".loop-bounce").forEach((el, i) => {
        gsap.to(el, {
          y: -14,
          duration: 1.1 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });

      // ---------- CONTINUOUS LOOPS (replace animate-pulse) ----------
      gsap.utils.toArray(".loop-pulse").forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.55,
          scale: 1.04,
          duration: 1.4 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // background glow, slower ambient pulse
      gsap.to(".loop-glow", {
        opacity: 0.6,
        scale: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // ---------- CONTINUOUS LOOPS (replace animate-ping) ----------
      gsap.utils.toArray(".loop-ping").forEach((el, i) => {
        gsap.to(el, {
          scale: 2.4,
          opacity: 0,
          duration: 1.6,
          repeat: -1,
          ease: "power1.out",
          delay: i * 0.3,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen bg-white overflow-hidden flex items-center"
    >
      {/* Background Glow */}
      <div className="loop-glow absolute top-32 right-20 w-[500px] h-[500px] bg-[#91F2E8]/30 rounded-full blur-3xl"></div>
      <div className="loop-glow absolute bottom-20 left-10 w-[250px] h-[250px] bg-[#91F2E8]/20 rounded-full blur-3xl"></div>

      <div className="w-full px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* ================= LEFT SIDE ================= */}
          <div>
            <span className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#91F2E8]/20 text-gray-800 font-semibold">
              🚀 India's Reward Based Coding Platform
            </span>

            <h1 className="hero-heading mt-8 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              <span className="line block">Learn.</span>
              <span className="line block text-[#91F2E8]">Solve.</span>
              <span className="line block">Earn Rewards.</span>
            </h1>

            <p className="hero-paragraph mt-8 text-lg lg:text-xl text-gray-600 leading-9 max-w-xl">
              Master programming by solving real interview problems.
              Earn reward points for every accepted solution and redeem
              exciting rewards while preparing for your dream job.
            </p>

            <blockquote className="hero-quote mt-8 border-l-4 border-[#91F2E8] pl-5 italic text-gray-700 text-lg">
              "The best programmers aren't born. They are built one problem
              at a time."
            </blockquote>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                to="/register"
                className="hero-btn px-8 py-4 rounded-xl bg-[#91F2E8] font-semibold text-gray-900 shadow-lg hover:scale-105 transition duration-300"
              >
                Start Coding
              </Link>

              <Link
                to="/login"
                className="hero-btn px-8 py-4 rounded-xl border-2 border-[#91F2E8] font-semibold hover:bg-[#91F2E8] transition duration-300"
              >
                Login
              </Link>
            </div>

            {/* Floating Tech Tags */}
            <div className="flex flex-wrap gap-4 mt-12">
              <div className="hero-tag flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <SiCplusplus className="text-blue-600 text-xl" />
                <span>C++</span>
              </div>

              <div className="hero-tag flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <SiPython className="text-yellow-500 text-xl" />
                <span>Python</span>
              </div>

              <div className="hero-tag flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <SiJavascript className="text-yellow-400 text-xl" />
                <span>JavaScript</span>
              </div>

              <div className="hero-tag flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <SiReact className="text-cyan-500 text-xl" />
                <span>React</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16"></div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Main Glow */}
            <div className="loop-pulse absolute w-[420px] h-[420px] bg-[#91F2E8]/30 rounded-full blur-3xl"></div>

            {/* Center Circle */}
            <div className="hero-orb relative z-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#91F2E8] to-cyan-300 shadow-2xl flex items-center justify-center">
              <div className="w-52 h-52 rounded-full bg-white shadow-xl flex items-center justify-center">
                <h1 className="text-7xl font-extrabold text-[#00A896]">
                  {"</>"}
                </h1>
              </div>
            </div>

            <div className="hero-float-label loop-bounce absolute top-0 left-6 bg-white shadow-lg rounded-full px-5 py-3">
              🧩 Solve Problems
            </div>

            <div className="hero-float-label loop-pulse absolute top-1 right-2 bg-white shadow-lg rounded-full px-5 py-3">
              ⭐ Earn Points
            </div>

            <div className="hero-float-label loop-bounce absolute bottom-16 left-0 bg-white shadow-lg rounded-full px-5 py-3">
              🎁 Redeem Rewards
            </div>

            <div className="hero-float-label loop-pulse absolute bottom-1/66 right-4 bg-white shadow-lg rounded-full px-5 py-3">
              🏆 Top Rankings
            </div>

            <div className="hero-float-label loop-bounce absolute top-1/3 -left-6 bg-white shadow-lg rounded-full px-5 py-3">
              🔥 Daily Challenge
            </div>

            <div className="hero-float-label loop-pulse absolute top-1/4 -right-10 bg-white shadow-lg rounded-full px-5 py-3">
              🚀 Crack Interviews
            </div>

            {/* Floating Reward Points */}
            <div className="hero-point loop-bounce absolute top-24 left-44 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg">
              +100
            </div>

            <div className="hero-point loop-pulse absolute bottom-30 right-42 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg">
              +250
            </div>

            <div className="hero-point loop-bounce absolute top-6 right-62 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg">
              +500
            </div>

            {/* Floating Code Snippets */}
            <div className="hero-snippet-1 absolute top-44 right-2 bg-gray-900 text-green-400 rounded-xl shadow-xl px-5 py-4 font-mono text-sm rotate-6">
              {`if(code){
  reward++;
}`}
            </div>

            <div className="hero-snippet-2 absolute bottom-0 left-20 bg-gray-900 text-cyan-400 rounded-xl shadow-xl px-5 py-4 font-mono text-sm -rotate-6">
              {`while(learn){
 solve();
}`}
            </div>

            {/* Decorative Circles */}
            <div className="hero-dot loop-ping absolute w-6 h-6 rounded-full bg-[#91F2E8] top-10 left-52"></div>

            <div className="hero-dot loop-pulse absolute w-4 h-4 rounded-full bg-cyan-300 bottom-28 right-24"></div>

            <div className="hero-dot loop-bounce absolute w-5 h-5 rounded-full bg-[#91F2E8] top-56 left-0"></div>

            <div className="hero-dot loop-ping absolute w-5 h-5 rounded-full bg-cyan-300 bottom-5 right-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;