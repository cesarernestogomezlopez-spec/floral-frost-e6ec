import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  CalendarDays,
  Sparkles,
  GraduationCap,
  BellRing,
  Calculator,
  LayoutDashboard,
  Cake,
  LayoutGrid,
  Palette,
  ChevronDown,
} from "lucide-react";
import featureHorario from "@/assets/feature-horario.jpeg";
import featureResumen from "@/assets/resumen-dia.jpeg";
import featureEius from "@/assets/feature-soporte.jpeg";
import featureNotificaciones from "@/assets/feature-notificaciones.jpeg";
import featureCalculadora from "@/assets/feature-calculadora.jpeg";
import featureInicio from "@/assets/app-screenshot.jpeg";
import featureCumples from "@/assets/feature-cumpleanios.jpeg";
import featureExtras from "@/assets/recursos-escolares.jpeg";
import featureAjustes from "@/assets/theme.jpeg";

const features = [
  {
    icon: Sparkles,
    title: "TECOS-GPT resume tu día",
    desc: "Lee fotos y archivos PDF para convertir tareas, avisos y apuntes en un resumen diario claro.",
    image: featureResumen,
  },
  {
    icon: GraduationCap,
    title: "E.I.U.S. dentro de la app",
    desc: "Consulta la plataforma escolar sin salir de Portal 202 y mantén tus herramientas académicas reunidas.",
    image: featureEius,
  },
  {
    icon: CalendarDays,
    title: "Tu horario, siempre a la mano",
    desc: "Revisa la semana completa en segundos, con una vista hecha para el ritmo del salón.",
    image: featureHorario,
  },
  {
    icon: BellRing,
    title: "Avisos que sí llegan",
    desc: "Recibe notificaciones importantes del salón y entérate a tiempo de cada actualización.",
    image: featureNotificaciones,
  },
  {
    icon: Calculator,
    title: "Calculadora escolar integrada",
    desc: "Resuelve operaciones rápidas desde la misma app, sin saltar entre herramientas.",
    image: featureCalculadora,
  },
  {
    icon: LayoutDashboard,
    title: "Un inicio pensado para 202",
    desc: "Horario, accesos y novedades aparecen desde el primer vistazo, sin menús innecesarios.",
    image: featureInicio,
  },
  {
    icon: Cake,
    title: "Cumpleaños del salón",
    desc: "Celebra a tus compañeros con recordatorios visibles y una sección dedicada a la comunidad.",
    image: featureCumples,
  },
  {
    icon: LayoutGrid,
    title: "Más recursos, menos vueltas",
    desc: "Encuentra accesos escolares y utilidades extra organizados en un solo lugar.",
    image: featureExtras,
  },
  {
    icon: Palette,
    title: "La app también se adapta a ti",
    desc: "Personaliza la apariencia y los ajustes para que Portal 202 se sienta realmente tuyo.",
    image: featureAjustes,
  },
];

const APK_URL =
  "https://github.com/cesarernestogomezlopez-spec/floral-frost-e6ec/releases/download/STABLE-202/PORTAL-202.apk";
const IOS_URL =
  "https://github.com/cesarernestogomezlopez-spec/floral-frost-e6ec/releases/latest/download/PORTAL-202-IOS.ipa";

export const AppPromo = () => {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <Smartphone size={14} className="text-primary" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-foreground/70 font-medium">
              Disponible para Android
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="gradient-text">E.I.U.S.</span> y{" "}
            <span className="gradient-text">PORTAL 202</span>,
            <br className="hidden sm:block" /> en tus manos
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed max-w-md mx-auto mb-8">
            Descarga la app oficial del <strong>Salón 202</strong> y lleva el horario,
            avisos y recursos escolares a donde vayas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
            {/* Option 1: Direct APK */}
            <motion.a
              href={APK_URL}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex flex-col items-center gap-2 glass-strong glow-green rounded-2xl px-6 py-5 font-bold tracking-wide transition cursor-pointer text-center"
            >
              <span className="text-3xl">📱</span>
              <span className="text-sm sm:text-base">Descargar directo</span>
              <span className="font-mono text-[10px] text-foreground/50 font-normal tracking-wider uppercase">APK · Portal 202</span>
            </motion.a>

            {/* Option 2: Direct iOS IPA */}
            <motion.a
              href={IOS_URL}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex flex-col items-center gap-2 glass rounded-2xl px-6 py-5 font-bold tracking-wide transition border border-primary/20 text-center"
            >
              <span className="text-3xl">🍎</span>
              <span className="text-sm sm:text-base">Descargar iOS</span>
              <span className="font-mono text-[10px] text-foreground/50 font-normal tracking-wider uppercase">IPA · Necesita computadora</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 1 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-4 hidden sm:flex flex-col items-center gap-1 text-foreground/40"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Descubre más</span>
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
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-foreground/50 mb-3">
            Nueve formas de simplificar tu día
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Hecha para el salón, <span className="gradient-text">útil todos los días</span>
          </h3>
        </motion.div>
      </section>

      {/* FEATURES — sticky phone, scroll-driven screenshots */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto px-4">
          {/* Sticky phone */}
          <div className="hidden lg:flex sticky top-24 h-[calc(100vh-6rem)] items-center justify-center">
            <div className="relative w-64 xl:w-72">
              <div className="absolute inset-0 rounded-[3rem] bg-[var(--orb-1)] blur-3xl scale-90" />
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
                viewport={{ amount: 0.4, margin: "-15% 0px -15% 0px" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[80vh] flex flex-col justify-center"
              >
                {/* Mobile inline screenshot */}
                <div className="lg:hidden mb-8 mx-auto w-56">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-[2.2rem] bg-[var(--orb-1)] blur-2xl scale-90" />
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
                  <div className="w-11 h-11 rounded-xl bg-primary/12 flex items-center justify-center border border-primary/25">
                    <f.icon size={20} className="text-primary" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">
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

      {/* Floating download bar */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 inset-x-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-lg"
          >
            <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl border border-border/60">
              <div className="flex-1 flex gap-2">
                <motion.a
                  href={APK_URL}
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 glow-green bg-[color:var(--c-mint)]/15 border border-[color:var(--c-mint)]/30 rounded-xl py-2.5 text-xs font-bold tracking-wide"
                >
                  <span>📱</span>
                  <span>Descargar directo</span>
                </motion.a>
                <motion.a
                  href={IOS_URL}
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 glass border border-primary/20 rounded-xl py-2.5 text-xs font-bold tracking-wide"
                >
                  <span>🍎</span>
                  <span className="hidden sm:inline">Descargar iOS</span>
                  <span className="sm:hidden">iOS</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
