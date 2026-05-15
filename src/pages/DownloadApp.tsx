import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Splash } from "@/components/Splash";
import { AppPromo } from "@/components/AppPromo";

let firstVisit = true;

const DownloadApp = () => {
  const [loading, setLoading] = useState(firstVisit);

  useEffect(() => {
    document.title = "Salón 202 · Descargar App";
    document.documentElement.removeAttribute("data-theme");
    if (firstVisit) {
      firstVisit = false;
      const t = setTimeout(() => setLoading(false), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Splash key="splash" />}</AnimatePresence>

      <main className="relative min-h-screen px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto">
        {/* ambient orbs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-teal-400/15 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        </div>

        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? -16 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-full flex items-center justify-between px-4 sm:px-6 py-3 mb-8"
        >
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="José Vasconcelos" className="h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]" />
            <div className="leading-tight">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">
                josé vasconcelos
              </p>
              <p className="text-sm font-bold tracking-wide">SALÓN 202</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase hidden sm:inline-flex"
            >
              Inicio
            </Link>
            <Link
              to="/survey"
              className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase hidden sm:inline-flex"
            >
              Encuesta
            </Link>
            <a
              href="https://github.com/cesarernestogomezlopez-spec/floral-frost-e6ec/releases/download/STABLE-202/app-release.apk"
              download
              className="glass-btn text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
            >
              Descargar desde Portal 202
            </a>
          </div>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <AppPromo />
        </motion.div>

        <footer className="text-center text-xs text-foreground/40 tracking-widest uppercase py-10 mt-6">
          © 2025 — Portal Salón 202 · José Vasconcelos
        </footer>
      </main>
    </>
  );
};

export default DownloadApp;
