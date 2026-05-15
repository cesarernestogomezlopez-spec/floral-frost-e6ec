import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Splash } from "@/components/Splash";
import { Schedule } from "@/components/Schedule";
import { PortalModal } from "@/components/PortalModal";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Salón 202 · Inicio";
    document.documentElement.removeAttribute("data-theme");
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
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
              to="/download-app"
              className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase hidden sm:inline-flex"
            >
              App
            </Link>
            <Link
              to="/survey"
              className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase hidden sm:inline-flex"
            >
              Encuesta
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="glass-btn text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
            >
              Entrar al Portal 202
            </button>
          </div>
        </motion.nav>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-center my-10 sm:my-16"
        >
          <p className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-foreground/50 mb-3">
            Bienvenidos al
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none">
            <span className="gradient-text-green">SALÓN 202</span>
          </h1>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Schedule />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex justify-center gap-4 mt-12 sm:hidden"
        >
          <Link to="/download-app" className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase">
            Descargar App
          </Link>
          <Link to="/survey" className="glass-btn text-xs font-semibold tracking-[0.15em] uppercase">
            Encuesta
          </Link>
        </motion.div>

        <footer className="text-center text-xs text-foreground/40 tracking-widest uppercase py-10 mt-6">
          © 2025 — Salón 202 · José Vasconcelos
        </footer>
      </main>

      <PortalModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Home;
