import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Trophy,
  Brain,
  Clock,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

// npm install gsap
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Code2 size={32} />,
    title: "Real-Time Coding",
    description:
      "Solve coding challenges in C++, Java, and Python with instant execution and feedback.",
  },
  {
    icon: <Trophy size={32} />,
    title: "Earn Rewards",
    description:
      "Gain points for solving problems and redeem them for exciting rewards.",
  },
  {
    icon: <Brain size={32} />,
    title: "Curated Problems",
    description:
      "Practice beginner to advanced questions covering every important DSA topic.",
  },
  {
    icon: <Clock size={32} />,
    title: "Track Progress",
    description:
      "Monitor solved problems, streaks, and performance with detailed analytics.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Platform",
    description:
      "Safe authentication, protected submissions, and reliable evaluation system.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Leaderboard",
    description:
      "Compete with other coders and climb the leaderboard by earning more points.",
  },
];

function Features() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---------- Header reveal ----------
      gsap.from(".feat-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".feat-heading", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".feat-subtext", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // ---------- Card grid reveal (staggered) ----------
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 70,
        scale: 0.94,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feat-grid",
          start: "top 82%",
        },
      });

      // ---------- Ambient background blobs ----------
      gsap.to(".feat-blob-1", {
        x: 40,
        y: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".feat-blob-2", {
        x: -50,
        y: 40,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ---------- Per-card hover interactions ----------
      cardsRef.current.forEach((card) => {
        const icon = card.querySelector(".feat-icon");
        const arrow = card.querySelector(".feat-arrow");
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(
            card,
            {
              y: -12,
              scale: 1.03,
              boxShadow: "0 30px 60px -20px rgba(0, 140, 130, 0.35)",
              duration: 0.35,
              ease: "power2.out",
            },
            0
          )
          .to(
            icon,
            {
              rotate: 12,
              scale: 1.12,
              backgroundColor: "#00A896",
              color: "#ffffff",
              duration: 0.35,
              ease: "power2.out",
            },
            0
          )
          .to(
            arrow,
            { x: 4, opacity: 1, duration: 0.3, ease: "power2.out" },
            0
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-cyan-50 py-24 overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div className="feat-blob-1 pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] bg-[#91F2E8]/25 rounded-full blur-3xl"></div>
      <div className="feat-blob-2 pointer-events-none absolute bottom-0 right-0 w-[380px] h-[380px] bg-[#00A896]/15 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="feat-eyebrow inline-block text-[#00A896] font-semibold uppercase tracking-widest px-4 py-1 rounded-full bg-[#91F2E8]/20">
            Why Choose Us
          </p>

          <h2 className="feat-heading text-4xl md:text-5xl font-bold mt-4 text-gray-900">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-[#00A896] to-cyan-500 bg-clip-text text-transparent">
              Master Coding
            </span>
          </h2>

          <p className="feat-subtext text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
            Learn Data Structures & Algorithms, compete with others,
            earn rewards, and become interview-ready through one modern platform.
          </p>
        </div>

        <div className="feat-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addCardRef}
              className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden will-change-transform"
            >
              {/* subtle top accent bar */}
              <span className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#00A896] to-[#91F2E8] transition-all duration-500 group-hover:w-full"></span>

              <div className="feat-icon w-16 h-16 rounded-2xl bg-[#91F2E8] flex items-center justify-center text-[#008C82] mb-6 transition-colors">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">{feature.description}</p>

              <span className="feat-arrow inline-flex items-center gap-1 mt-5 text-[#00A896] font-semibold opacity-0">
                Learn more →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;