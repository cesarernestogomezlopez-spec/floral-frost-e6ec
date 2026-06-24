import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/**
 * Loading screen that mirrors the Portal Salón 202 loader
 * (public/new-ui.html #loading-screen): spring-pastel mesh,
 * three floating blobs, a frosted glass card with the green
 * leaf mark, a purple→pink shimmer title and bouncing mint dots.
 *
 * Exits with a smooth opacity + scale + blur fade so the handoff
 * from the portal's redirect loader into this page feels continuous.
 */
export const Splash = () => {
  return createPortal(
    <motion.div
      className="splash-root fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ambient mesh + floating blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--mesh)" }}
      />
      <div className="splash-blob splash-blob-1 h-[min(60vw,460px)] w-[min(60vw,460px)] -top-[12%] -left-[12%]" />
      <div className="splash-blob splash-blob-2 h-[min(50vw,400px)] w-[min(50vw,400px)] -bottom-[10%] -right-[10%]" />
      <div className="splash-blob splash-blob-3 h-[min(35vw,280px)] w-[min(35vw,280px)] top-[25%] right-[3%]" />

      <motion.div
        className="splash-card relative z-10 flex flex-col items-center gap-6 rounded-[32px] px-12 py-12 sm:px-16"
        initial={{ opacity: 0, scale: 0.94, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="grid h-20 w-20 place-items-center overflow-hidden rounded-full"
          style={{
            background: "var(--c-green-deep)",
            boxShadow: "0 8px 32px rgba(4,32,8,0.32)",
          }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        >
          <svg viewBox="10 17 90 90" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#fff" d="M32,64C32,64 38.39,52.99 44.13,50.95C51.37,48.37 66.26,36.6 67.5,26.5C67.5,26.5 80.24,42.67 75.85,62.35C75.85,62.35 86.5,78.5 86.5,88.5C86.5,98.5 74,92.5 68,88.5C62,84.5 56,86.5 48,88.5C40,90.5 30,92 28,82C26,72 32,64 32,64Z" />
            <path fill="#fff" d="M34.9,86.17C25.7,73.53 28.24,56.26 39.16,48.85C39.16,48.85 33.7,61.17 36.2,69.62C36.2,69.62 40.96,63.08 44.41,62.1C44.41,62.1 38.2,71.46 43.01,82.18C43.01,82.18 50.29,71.06 59.97,68.66C59.97,68.66 51.2,75.85 51.2,82.18C51.2,88.5 58.96,87.96 64.26,86.61C64.26,86.61 55.36,97.09 42.51,97.09C34.51,97.09 34.9,86.17 34.9,86.17Z" />
          </svg>
        </motion.div>

        <div className="flex flex-col items-center text-center">
          <motion.span
            className="splash-mono mb-2 text-[0.7rem] uppercase tracking-[0.22em]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            josé vasconcelos
          </motion.span>
          <h1 className="gradient-text text-5xl font-black leading-none tracking-tight sm:text-6xl">
            Salón 202
          </h1>
        </div>

        <div className="flex h-7 items-end gap-2.5">
          <span className="splash-dot" />
          <span className="splash-dot" />
          <span className="splash-dot" />
        </div>

        <motion.span
          className="splash-mono min-h-[1.2rem] text-center text-[0.72rem] tracking-[0.04em]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Cargando portal...
        </motion.span>
      </motion.div>
    </motion.div>,
    document.body,
  );
};
