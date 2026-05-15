import { motion } from "framer-motion";

export const Splash = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center px-6"
      >
        <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-foreground/60 font-light mb-4">
          josé vasconcelos
        </span>
        <h1 className="gradient-text-green font-black tracking-tight text-6xl sm:text-8xl md:text-9xl leading-none">
          SALÓN 202
        </h1>

        <motion.div
          className="mt-10 h-[2px] w-56 sm:w-72 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full w-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(150 90% 60%), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
