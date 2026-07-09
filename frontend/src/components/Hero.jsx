import { Link } from "react-router-dom";
import {
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiDocker,
  SiGit,
} from "react-icons/si";

function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center">

      {/* Background Glow */}
      <div className="absolute top-32 right-20 w-[500px] h-[500px] bg-[#91F2E8]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-[250px] h-[250px] bg-[#91F2E8]/20 rounded-full blur-3xl"></div>

      <div className="w-full px-8 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ================= LEFT SIDE ================= */}

          <div>

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#91F2E8]/20 text-gray-800 font-semibold">
              🚀 India's Reward Based Coding Platform
            </span>

            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Learn.
              <span className="text-[#91F2E8]"> Solve.</span>
              <br />
              Earn Rewards.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-gray-600 leading-9 max-w-xl">
              Master programming by solving real interview problems.
              Earn reward points for every accepted solution and redeem
              exciting rewards while preparing for your dream job.
            </p>

            <blockquote className="mt-8 border-l-4 border-[#91F2E8] pl-5 italic text-gray-700 text-lg">
              "The best programmers aren't born. They are built one problem
              at a time."
            </blockquote>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-[#91F2E8] font-semibold text-gray-900 shadow-lg hover:scale-105 transition duration-300"
              >
                Start Coding
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 rounded-xl border-2 border-[#91F2E8] font-semibold hover:bg-[#91F2E8] transition duration-300"
              >
                Login
              </Link>

            </div>

            {/* Floating Tech Tags */}

            <div className="flex flex-wrap gap-4 mt-12">

            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
            <SiCplusplus className="text-blue-600 text-xl" />
            <span>C++</span>
            </div>

          


                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <SiPython className="text-yellow-500 text-xl" />
                <span>Python</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                    <SiJavascript className="text-yellow-400 text-xl" />
                    <span>JavaScript</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                    <SiReact className="text-cyan-500 text-xl" />
                    <span>React</span>
                </div>
                
            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-8 mt-16">

              
             

              

            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="relative hidden lg:flex items-center justify-center">
                        {/* ===== RIGHT SIDE ===== */}

            {/* Main Glow */}
            <div className="absolute w-[420px] h-[420px] bg-[#91F2E8]/30 rounded-full blur-3xl animate-pulse"></div>

            {/* Center Circle */}
            <div className="relative z-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#91F2E8] to-cyan-300 shadow-2xl flex items-center justify-center">

              <div className="w-52 h-52 rounded-full bg-white shadow-xl flex items-center justify-center">

                <h1 className="text-7xl font-extrabold text-[#00A896]">
                  {"</>"}
                </h1>

              </div>

            </div>

<div className="absolute top-0 left-6 bg-white shadow-lg rounded-full px-5 py-3 animate-bounce">
  🧩 Solve Problems
</div>

<div className="absolute top-1 right-2 bg-white shadow-lg rounded-full px-5 py-3 animate-pulse">
  ⭐ Earn Points
</div>

<div className="absolute bottom-16 left-0 bg-white shadow-lg rounded-full px-5 py-3 animate-bounce">
  🎁 Redeem Rewards
</div>

<div className="absolute bottom-1/66 right-4 bg-white shadow-lg rounded-full px-5 py-3 animate-pulse">
  🏆 Top Rankings
</div>

<div className="absolute top-1/3 -left-6 bg-white shadow-lg rounded-full px-5 py-3 animate-bounce">
  🔥 Daily Challenge
</div>

<div className="absolute top-1/4 -right-10 bg-white shadow-lg rounded-full px-5 py-3 animate-pulse">
  🚀 Crack Interviews
</div>

            {/* Floating Reward Points */}

            <div className="absolute top-24 left-44 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg animate-bounce">
              +100
            </div>

            <div className="absolute bottom-30 right-42 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg animate-pulse">
              +250
            </div>

            <div className="absolute top-6 right-62 bg-[#91F2E8] text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg animate-bounce">
              +500
            </div>

            {/* Floating Code Snippets */}

            <div className="absolute top-44 right-2 bg-gray-900 text-green-400 rounded-xl shadow-xl px-5 py-4 font-mono text-sm rotate-6">

{`if(code){
  reward++;
}`}
            </div>

            <div className="absolute bottom-0 left-20 bg-gray-900 text-cyan-400 rounded-xl shadow-xl px-5 py-4 font-mono text-sm -rotate-6">

{`while(learn){
 solve();
}`}
            </div>

            {/* Decorative Circles */}

            <div className="absolute w-6 h-6 rounded-full bg-[#91F2E8] top-10 left-52 animate-ping"></div>

            <div className="absolute w-4 h-4 rounded-full bg-cyan-300 bottom-28 right-24 animate-pulse"></div>

            <div className="absolute w-5 h-5 rounded-full bg-[#91F2E8] top-56 left-0 animate-bounce"></div>

            <div className="absolute w-5 h-5 rounded-full bg-cyan-300 bottom-5 right-10 animate-ping"></div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;