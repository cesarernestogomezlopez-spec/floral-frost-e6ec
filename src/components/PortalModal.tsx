import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const PortalModal = ({ open, onClose }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/60 backdrop-blur-2xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="glass-strong relative w-full max-w-2xl rounded-3xl p-8 sm:p-12"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-5 right-5 glass rounded-full p-2 hover:bg-white/15 transition"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.4em] uppercase text-foreground/50 mb-2">
                Portal 202
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Elige tu <span className="gradient-text-green">destino</span>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <motion.a
                href="https://portal-salon-202.cesarernestogomezlopez.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="glass-strong glow-green rounded-2xl py-10 px-6 flex flex-col items-center justify-center gap-3 group"
              >
                <span className="text-4xl">☀️</span>
                <span className="text-xl font-bold tracking-wider">
                  PORTAL 202
                </span>
                <span className="text-xs text-foreground/60 tracking-widest uppercase">
                  Acceso principal
                </span>
              </motion.a>

              <motion.a
                href="https://www.jv3.edu.mx/comunidad/eius"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="glass-strong glow-blue rounded-2xl py-10 px-6 flex flex-col items-center justify-center gap-3 group"
              >
                <span className="text-4xl">💻</span>
                <span className="text-xl font-bold tracking-wider">E.I.U.S</span>
                <span className="text-xs text-foreground/60 tracking-widest uppercase">
                  Recursos digitales
                </span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
