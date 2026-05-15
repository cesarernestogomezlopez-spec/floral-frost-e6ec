import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Bell,
  CalendarDays,
  BookOpen,
  ShieldCheck,
  RefreshCw,
  Headphones,
  ChevronDown,
} from "lucide-react";
import appScreenshot from "@/assets/app-screenshot.png";
import featureHorario from "@/assets/feature-horario.png";
import featureNotificaciones from "@/assets/feature-notificaciones.png";
import featureSoporte from "@/assets/feature-soporte.png";
import featureRecursosEscolares from "@/assets/recursos-escolares.png";
import featureActualizaciones from "@/assets/actualizaciones.png";

const features = [
  {
    icon: CalendarDays,
    title: "Horario en tu bolsillo",
    desc: "Consulta tu horario semanal de forma rápida y sin complicaciones.",
    image: featureHorario,
  },
  {
    icon: Bell,
    title: "Notificaciones",
    desc: "Recibe avisos importantes del salón al instante.",
    image: featureNotificaciones,
  },
  {
    icon: BookOpen,
    title: "Recursos escolares",
    desc: "Acceso directo a materiales y herramientas del portal.",
    image: featureRecursosEscolares,
  },
  {
    icon: ShieldCheck,
    title: "Soporte oficial E.I.U.S.",
    desc: "Integración completa con la plataforma oficial de la escuela.",
    image: featureSoporte,
  },
  {
    icon: RefreshCw,
    title: "Actualizaciones seguidas",
    desc: "Mejoras y nuevas funciones publicadas constantemente.",
    image: featureActualizaciones,
  },
  {
    icon: Headphones,
    title: "Soporte instantáneo",
    desc: "Resolvemos tus dudas y problemas en el momento.",
    image: appScreenshot,
  },
];

export const AppPromo = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="min-h-[calc(100vh-9rem)] flex flex-col items-center justify-center text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <Smartphone size={14} className="text-emerald-300" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-foreground/70 font-medium">
              Disponible para Android
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="gradient-text-green">E.I.U.S.</span> y{" "}
            <span className="gradient-text-green">PORTAL 202</span>,
            <br className="hidden sm:block" /> en tus manos
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-md mx-auto mb-8">
            Descarga la app oficial del <strong>Salón 202</strong> y lleva el horario,
            avisos y recursos escolares a donde vayas.
          </p>

          <motion.a
            href="https://play.google.com/store/apps/details?id=com.portalsalon202"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 glass-strong glow-green rounded-2xl px-8 py-4 font-bold tracking-wide transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
            </svg>
            <span className="text-sm sm:text-base">Descargar en Google Play</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 1 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-4 flex flex-col items-center gap-1 text-foreground/40"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Descubre más</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* SECTION HEADER */}
      <section className="pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-foreground/50 mb-3">
            Ventajas
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Todo lo que necesitas, <span className="gradient-text-green">en una sola app</span>
          </h3>
        </motion.div>
      </section>

      {/* FEATURES — sticky phone, scroll-driven screenshots */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto px-4">
          {/* Sticky phone */}
          <div className="hidden lg:flex sticky top-24 h-[calc(100vh-6rem)] items-center justify-center">
            <div className="relative w-64 xl:w-72">
              <div className="absolute inset-0 rounded-[3rem] bg-emerald-500/30 blur-3xl scale-90" />
              {/* Note 10+ style frame: ultra-thin bezels, glossy black, subtle side highlight */}
              <div className="relative rounded-[2.4rem] p-[3px] bg-gradient-to-b from-neutral-700 via-black to-neutral-800 shadow-2xl">
                <div className="rounded-[2.25rem] p-[2px] bg-black">
                  <div className="relative rounded-[2.15rem] bg-black overflow-hidden aspect-[9/19.5]">
                    {features.map((f, i) => (
                      <motion.img
                        key={f.title}
                        src={f.image}
                        alt={f.title}
                        initial={false}
                        animate={{
                          opacity: active === i ? 1 : 0,
                          scale: active === i ? 1 : 1.04,
                          filter: active === i ? "blur(0px)" : "blur(8px)",
                        }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ))}
                    {/* centered hole-punch camera */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black ring-1 ring-neutral-800 z-10" />
                  </div>
                </div>
                {/* glossy side highlights to mimic curved edge */}
                <div className="pointer-events-none absolute inset-y-6 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-l-[2.4rem]" />
                <div className="pointer-events-none absolute inset-y-6 right-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-r-[2.4rem]" />
              </div>
            </div>
          </div>

          {/* Scrolling features */}
          <div className="flex flex-col">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6, margin: "-30% 0px -30% 0px" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[80vh] flex flex-col justify-center"
              >
                {/* Mobile inline screenshot */}
                <div className="lg:hidden mb-8 mx-auto w-56">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-[2.2rem] bg-emerald-500/25 blur-2xl scale-90" />
                    <div className="relative rounded-[2rem] p-[3px] bg-gradient-to-b from-neutral-700 via-black to-neutral-800 shadow-2xl">
                      <div className="rounded-[1.85rem] p-[2px] bg-black">
                        <div className="relative rounded-[1.75rem] bg-black overflow-hidden aspect-[9/19.5]">
                          <img
                            src={f.image}
                            alt={f.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black ring-1 ring-neutral-800 z-10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-200/20">
                    <f.icon size={20} className="text-emerald-300" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                    Ventaja {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  {f.title}
                </h4>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-md">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
