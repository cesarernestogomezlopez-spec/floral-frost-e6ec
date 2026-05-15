import { motion } from "framer-motion";

type Cell = { subject: string; tone?: "class" | "break" | "para" };

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;

type Row =
  | { kind: "row"; time: string; cells: Cell[] }
  | { kind: "span"; time: string; label: string; tone: "break" | "para" };

const schedule: Row[] = [
  {
    kind: "row",
    time: "7:00 — 7:50",
    cells: [
      { subject: "TLR2" },
      { subject: "Deportes" },
      { subject: "AV2" },
      { subject: "Química" },
      { subject: "AV2" },
    ],
  },
  {
    kind: "row",
    time: "8:00 — 8:50",
    cells: [
      { subject: "Matemáticas" },
      { subject: "Inglés" },
      { subject: "Deportes" },
      { subject: "Química" },
      { subject: "Inglés" },
    ],
  },
  { kind: "span", time: "8:50 — 9:20", label: "RECREO LARGO", tone: "break" },
  {
    kind: "row",
    time: "9:20 — 10:10",
    cells: [
      { subject: "AV2" },
      { subject: "Química" },
      { subject: "Inglés" },
      { subject: "TLR2" },
      { subject: "ICS1" },
    ],
  },
  {
    kind: "row",
    time: "10:20 — 11:20",
    cells: [
      { subject: "Orientación" },
      { subject: "TLR2" },
      { subject: "Orientación" },
      { subject: "Matemáticas" },
      { subject: "TLR2" },
    ],
  },
  {
    kind: "row",
    time: "11:20 — 12:10",
    cells: [
      { subject: "Informática" },
      { subject: "Matemáticas" },
      { subject: "Matemáticas" },
      { subject: "Informática" },
      { subject: "Química" },
    ],
  },
  {
    kind: "row",
    time: "12:15 — 1:00",
    cells: [
      { subject: "ICS1" },
      { subject: "ICS1" },
      { subject: "Informática" },
      { subject: "Inglés" },
      { subject: "Matemáticas" },
    ],
  },
  {
    kind: "row",
    time: "1:05 — 2:00",
    cells: [
      { subject: "Ética" },
      { subject: "Informática" },
      { subject: "Química" },
      { subject: "Ética" },
      { subject: "Ética" },
    ],
  },
  { kind: "span", time: "2:10 — 4:00", label: "PARAESCOLARES", tone: "para" },
];

const toneClass = (tone?: Cell["tone"]) => {
  switch (tone) {
    case "break":
      return "bg-teal-300/15 border-teal-200/25 text-teal-100";
    case "para":
      return "bg-emerald-300/15 border-emerald-200/30 text-emerald-100";
    default:
      return "bg-sky-300/10 border-sky-200/20 text-sky-50";
  }
};

export const Schedule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-4 sm:p-6 md:p-8"
    >
      <div className="flex items-end justify-between mb-6 px-1">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-foreground/50">
            Horario semanal
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-1">
            Salón <span className="gradient-text-green">202</span>
          </h2>
        </div>
        <span className="hidden sm:inline-flex glass rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-foreground/70">
          Ciclo 2025 — 2026
        </span>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-[640px] px-2 sm:px-0">
          {/* Header */}
          <div className="grid grid-cols-[110px_repeat(5,1fr)] gap-2 mb-2">
            <div className="text-[10px] sm:text-xs tracking-widest uppercase text-foreground/50 px-3 py-2">
              Hora
            </div>
            {days.map((d) => (
              <div
                key={d}
                className="glass rounded-xl px-3 py-2 text-center text-xs sm:text-sm font-semibold tracking-wide"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-2">
            {schedule.map((row, idx) => {
              if (row.kind === "span") {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.4 }}
                    className="grid grid-cols-[110px_1fr] gap-2"
                  >
                    <div className="px-3 py-3 text-[11px] sm:text-xs text-foreground/60 font-medium tabular-nums">
                      {row.time}
                    </div>
                    <div
                      className={`rounded-xl border px-4 py-3 text-center font-bold tracking-[0.2em] uppercase text-sm sm:text-base ${
                        row.tone === "break"
                          ? "bg-teal-400/20 border-teal-200/30 text-teal-50"
                          : "bg-emerald-400/20 border-emerald-200/30 text-emerald-50"
                      }`}
                      style={{
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                      }}
                    >
                      {row.label}
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.4 }}
                  className="grid grid-cols-[110px_repeat(5,1fr)] gap-2"
                >
                  <div className="px-3 py-3 text-[11px] sm:text-xs text-foreground/60 font-medium tabular-nums">
                    {row.time}
                  </div>
                  {row.cells.map((c, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border px-2 py-3 text-center text-xs sm:text-sm transition-all hover:scale-[1.02] hover:bg-white/15 ${toneClass(
                        c.tone,
                      )}`}
                      style={{
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                      }}
                    >
                      {c.subject}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
