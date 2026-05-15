import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronRight,
  Sparkles,
  FileText,
  ListChecks,
  ShieldCheck,
  Heart,
  AlertTriangle,
  Star,
  ThumbsUp,
  ThumbsDown,
  GraduationCap,
  BookOpen,
  Lock,
  X,
} from "lucide-react";

const CLASSES = [
  "TLR2",
  "Deportes",
  "AV2",
  "Química",
  "Matemáticas",
  "Inglés",
  "Orientación",
  "Informática",
  "ICS1",
  "Ética",
] as const;

export type Answer = {
  rating: number;
  likeSubject: string;
  dislikeSubject: string;
  likeTeacher: string;
  dislikeTeacher: string;
};

const EMPTY_ANSWER: Answer = {
  rating: 0,
  likeSubject: "",
  dislikeSubject: "",
  likeTeacher: "",
  dislikeTeacher: "",
};

const Survey = () => {
  const [phase, setPhase] = useState<"intro1" | "intro2" | "terms" | "classes" | "success" | "error">("intro1");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Encuesta · Jefatura de Grupo";
    document.documentElement.setAttribute("data-theme", "survey");
    return () => document.documentElement.removeAttribute("data-theme");
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload: Record<string, string> = {};
    for (const [cls, ans] of Object.entries(answers)) {
      payload[`${cls} · Calificación`] = String(ans.rating);
      payload[`${cls} · Le gusta de la materia`] = ans.likeSubject;
      payload[`${cls} · No le gusta de la materia`] = ans.dislikeSubject;
      payload[`${cls} · Le gusta del maestro`] = ans.likeTeacher;
      payload[`${cls} · No le gusta del maestro`] = ans.dislikeTeacher;
    }
    try {
      const res = await fetch("https://formspree.io/f/mwvyrvqr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setPhase("success");
      } else {
        setPhase("error");
      }
    } catch {
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[oklch(0.85_0.19_115_/_0.18)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[oklch(0.55_0.17_150_/_0.25)] blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-[350px] w-[350px] rounded-full bg-[oklch(0.70_0.18_135_/_0.15)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10 lg:py-14">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[image:var(--gradient-gold)]">
              <Sparkles className="h-4 w-4 text-[color:var(--gold-foreground)]" />
            </div>
            <span className="font-display text-xl tracking-wide">José Vasconcelos</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground sm:block">
              Encuesta · 2026
            </div>
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Inicio
            </Link>
          </div>
        </header>

        <div className="hairline mx-auto mt-8 h-px w-full max-w-4xl" />

        {/* Hero */}
        <section className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]/90">
            {phase === "intro1"
              ? "Bienvenida"
              : phase === "intro2"
              ? "¿Cómo funciona?"
              : phase === "terms"
              ? "Términos y Condiciones"
              : phase === "success"
              ? "¡Listo!"
              : phase === "error"
              ? "Error"
              : "Tus materias"}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
            {phase === "intro1" ? (
              <>¡Gracias por mostrar <span className="gold-text">interés</span>!</>
            ) : phase === "intro2" ? (
              <>Tu voz construye un <span className="gold-text">acuerdo justo</span>.</>
            ) : phase === "terms" ? (
              <>Antes de empezar, <span className="gold-text">acepta los términos</span>.</>
            ) : phase === "success" ? (
              <>Encuesta enviada <span className="gold-text">con éxito</span>.</>
            ) : phase === "error" ? (
              <>Algo salió <span className="gold-text">mal</span>.</>
            ) : (
              <>Califica a tus <span className="gold-text">maestros</span>.</>
            )}
          </h1>
        </section>

        {/* Card */}
        <section className="mx-auto mt-10 w-full max-w-2xl">
          <div className="luxe-card rounded-2xl p-1.5">
            <div className="rounded-[14px] bg-card/60 p-8 backdrop-blur-xl sm:p-10">
              {phase === "intro1" && <Intro1 onNext={() => setPhase("intro2")} />}
              {phase === "intro2" && (
                <Intro2 onBack={() => setPhase("intro1")} onNext={() => setPhase("terms")} />
              )}
              {phase === "terms" && (
                <Terms onBack={() => setPhase("intro2")} onNext={() => setPhase("classes")} />
              )}
              {phase === "classes" && (
                <ClassesPhase
                  classes={CLASSES as unknown as string[]}
                  answers={answers}
                  activeClass={activeClass}
                  onSelect={(c) => setActiveClass(c)}
                  onClose={() => setActiveClass(null)}
                  onSave={(c, a) => {
                    setAnswers((prev) => ({ ...prev, [c]: a }));
                    setActiveClass(null);
                  }}
                  onBack={() => setPhase("terms")}
                  onSubmit={handleSubmit}
                />
              )}
              {submitting && (
                <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in duration-300">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--gold)] border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Enviando respuestas...</p>
                </div>
              )}
              {phase === "success" && !submitting && (
                <div className="flex flex-col items-center gap-4 py-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[oklch(0.85_0.19_118_/_0.1)]">
                    <Check className="h-8 w-8 text-[color:var(--gold)]" />
                  </div>
                  <p className="text-base leading-relaxed text-foreground/90">
                    Tus respuestas fueron enviadas correctamente. ¡Gracias por participar!
                  </p>
                </div>
              )}
              {phase === "error" && !submitting && (
                <div className="flex flex-col items-center gap-4 py-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-destructive/40 bg-destructive/10">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <p className="text-base leading-relaxed text-foreground/90">
                    Hubo un error al enviar. Intenta de nuevo.
                  </p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5"
                  >
                    Reintentar
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Todas las respuestas son completamente anónimas.
          </p>
        </section>

        <footer className="mt-auto pt-16 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Jefatura de Grupo · 2026
        </footer>
      </div>
    </main>
  );
};

export default Survey;

function Intro1({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[oklch(0.85_0.19_118_/_0.1)]">
          <Heart className="h-5 w-5 text-[color:var(--gold)]" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Mensaje del Jefe de Grupo
        </p>
      </div>

      <p className="text-base leading-relaxed text-foreground/90">
        Esta encuesta fue organizada por el Jefe de Grupo para conocer y obtener
        las quejas que ustedes, estudiantes, tienen sobre los maestros — por
        ejemplo: si el/la maestrx deja mucha tarea los fines de semana, regaña
        mucho, etc.
      </p>

      <div className="mt-6 rounded-xl border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[oklch(0.85_0.19_115_/_0.06)] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
          <p className="text-sm font-medium uppercase leading-relaxed tracking-[0.08em] text-foreground">
            El objetivo no es insultar, sino llegar a un acuerdo entre
            maestro–alumno. Cualquier insulto hacia un maestro será eliminado.
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_50px_-10px_oklch(0.85_0.19_118_/_0.8)]"
        >
          Siguiente
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

function Intro2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[oklch(0.85_0.19_118_/_0.1)]">
          <ListChecks className="h-5 w-5 text-[color:var(--gold)]" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          ¿Cómo funciona esto?
        </p>
      </div>

      <ol className="space-y-5">
        <li className="flex gap-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-sm font-semibold text-[color:var(--gold-foreground)]">
            1
          </span>
          <div className="flex-1">
            <p className="leading-relaxed text-foreground/90">
              Usted va a calificar la experiencia que tiene con los maestros de
              todas las materias. Va a escribir:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                Lo que te gusta
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                Lo que no te gusta (quejas)
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                Sugerencias
              </li>
            </ul>
          </div>
        </li>

        <li className="flex gap-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-sm font-semibold text-[color:var(--gold-foreground)]">
            2
          </span>
          <div className="flex-1">
            <p className="leading-relaxed text-foreground/90">
              Yo, como el Jefe de Grupo, voy a recibir los resultados (todo el
              feedback que usted envíe será{" "}
              <span className="font-semibold text-[color:var(--gold)]">totalmente anónimo</span>) y
              voy a resumir los problemas en un solo{" "}
              <span className="inline-flex items-center gap-1 font-medium">
                <FileText className="h-3.5 w-3.5" />
                .pdf
              </span>
              , para luego ser enviado a la asesora o directamente al maestro/a.
            </p>
          </div>
        </li>
      </ol>

      <div className="mt-8 rounded-xl border border-border/60 bg-input/30 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              ¿Cuál es el propósito?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              El propósito no es insultar a ningún maestro/a, sino arreglar todas
              las quejas y llegar a un acuerdo equilibrado y justo.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={onNext}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_50px_-10px_oklch(0.85_0.19_118_/_0.8)]"
        >
          Empezar
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

function Terms({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [accepted, setAccepted] = useState(false);
  const items = [
    "Esto NO es ni será una plataforma para insultar a los maestros.",
    "El único objetivo será mejorar el espacio y la relación entre docente y estudiante.",
    "Las respuestas son anónimas, pero se van a filtrar para evitar insultos o palabras fuera de lugar — eso lo haré para evitarles el reporte.",
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] bg-[oklch(0.85_0.19_118_/_0.1)]">
          <ShieldCheck className="h-5 w-5 text-[color:var(--gold)]" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Términos y Condiciones
        </p>
      </div>

      <ul className="space-y-4">
        {items.map((text, i) => (
          <li key={i} className="flex gap-4 rounded-xl border border-border/60 bg-input/30 p-5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-xs font-semibold text-[color:var(--gold-foreground)]">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-foreground/90">{text}</p>
          </li>
        ))}
      </ul>

      <label
        className={`mt-8 flex cursor-pointer items-start gap-3 rounded-xl border p-5 transition-all ${
          accepted
            ? "border-[color-mix(in_oklab,var(--gold)_60%,transparent)] bg-[oklch(0.85_0.19_118_/_0.08)] shadow-[0_0_0_4px_oklch(0.85_0.19_118_/_0.1)]"
            : "border-border/60 bg-input/30 hover:border-[color-mix(in_oklab,var(--gold)_40%,transparent)]"
        }`}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all ${
            accepted
              ? "border-[color:var(--gold)] bg-[image:var(--gradient-gold)]"
              : "border-border bg-background"
          }`}
        >
          {accepted && <Check className="h-3.5 w-3.5 text-[color:var(--gold-foreground)]" />}
        </span>
        <span className="text-sm leading-relaxed text-foreground/90">
          He leído y acepto los términos y condiciones. Me comprometo a usar
          esta encuesta con respeto y con el propósito de mejorar la relación
          docente–estudiante.
        </span>
      </label>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!accepted}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_50px_-10px_oklch(0.85_0.19_118_/_0.8)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Aceptar y continuar
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

function ClassesPhase({
  classes,
  answers,
  activeClass,
  onSelect,
  onClose,
  onSave,
  onBack,
  onSubmit,
}: {
  classes: string[];
  answers: Record<string, Answer>;
  activeClass: string | null;
  onSelect: (c: string) => void;
  onClose: () => void;
  onSave: (c: string, a: Answer) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialDone, setTutorialDone] = useState(false);

  const tutorialSteps = [
    {
      icon: BookOpen,
      title: "Estas son tus 10 materias",
      body: "Aquí ves todas las materias de tu horario semanal. Vas a calificar a cada maestro de forma individual.",
    },
    {
      icon: ListChecks,
      title: "¿Qué vas a contestar?",
      body: "Para cada maestro responderás 5 cosas — toma sólo un par de minutos por materia:",
      bullets: [
        { icon: Star, label: "Calificación al maestro", sub: "del 1 al 5" },
        { icon: ThumbsUp, label: "Lo que te gusta de la materia", sub: "" },
        { icon: ThumbsDown, label: "Lo que no te gusta de la materia", sub: "" },
        { icon: GraduationCap, label: "Lo que te gusta del maestro", sub: "cómo enseña, cómo trata al grupo, etc." },
        { icon: AlertTriangle, label: "Lo que no te gusta del maestro", sub: "sin insultos" },
      ],
    },
    {
      icon: ShieldCheck,
      title: "Totalmente anónimo",
      body: "Tus respuestas no llevan tu nombre. Sólo se usan para resumir las quejas y propuestas del grupo.",
    },
    {
      icon: Sparkles,
      title: "¡Listo para empezar!",
      body: "Toca cualquier materia para comenzar. Puedes hacerlas en el orden que quieras.",
    },
  ];

  const total = classes.length;
  const doneCount = Object.keys(answers).length;
  const progress = Math.round((doneCount / total) * 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Salón 202 · Turno matutino
          </p>
          <p className="mt-1 font-display text-lg">
            {doneCount} / {total} completadas
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setTutorialStep(0); setTutorialDone(false); }}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver tutorial
        </button>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {classes.map((c, idx) => {
          const isDone = !!answers[c];
          return (
            <button
              key={c}
              type="button"
              disabled={!tutorialDone}
              onClick={() => onSelect(c)}
              className={`group relative flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                isDone
                  ? "border-[color-mix(in_oklab,var(--gold)_60%,transparent)] bg-[oklch(0.85_0.19_118_/_0.08)]"
                  : "border-border bg-input/30 hover:border-[color-mix(in_oklab,var(--gold)_40%,transparent)] hover:bg-input/50"
              } ${tutorialDone ? "cursor-pointer hover:-translate-y-0.5" : "cursor-not-allowed opacity-70"}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-[image:var(--gradient-gold)] font-display text-sm text-[color:var(--gold-foreground)]">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-display text-base leading-none text-foreground">{c}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {isDone ? "Completada" : "Pendiente"}
                  </p>
                </div>
              </div>
              {isDone ? (
                <Check className="h-5 w-5 text-[color:var(--gold)]" />
              ) : !tutorialDone ? (
                <Lock className="h-4 w-4 text-muted-foreground/60" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Atrás
        </button>
        {doneCount === total && (
          <button
            type="button"
            onClick={onSubmit}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5"
          >
            Enviar encuesta
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {!tutorialDone && (
        <TutorialOverlay
          step={tutorialStep}
          steps={tutorialSteps}
          onPrev={() => setTutorialStep((s) => Math.max(0, s - 1))}
          onNext={() => {
            if (tutorialStep === tutorialSteps.length - 1) setTutorialDone(true);
            else setTutorialStep((s) => s + 1);
          }}
          onSkip={() => setTutorialDone(true)}
        />
      )}

      {activeClass && (
        <ClassRatingDialog
          classname={activeClass}
          initial={answers[activeClass] ?? EMPTY_ANSWER}
          onClose={onClose}
          onSave={(a) => onSave(activeClass, a)}
        />
      )}
    </div>
  );
}

type Bullet = { icon: React.ComponentType<{ className?: string }>; label: string; sub: string };
type TStep = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  bullets?: Bullet[];
};

function TutorialOverlay({
  step,
  steps,
  onPrev,
  onNext,
  onSkip,
}: {
  step: number;
  steps: TStep[];
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const s = steps[step];
  const Icon = s.icon;
  const isLast = step === steps.length - 1;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      <div className="luxe-card relative w-full max-w-md rounded-2xl p-1.5 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-[14px] bg-card/90 p-7 backdrop-blur-xl">
          <button
            type="button"
            onClick={onSkip}
            aria-label="Saltar"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-input/50 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid h-12 w-12 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[image:var(--gradient-gold)]">
            <Icon className="h-5 w-5 text-[color:var(--gold-foreground)]" />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]/90">
            Tutorial · {step + 1}/{steps.length}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>

          {s.bullets && (
            <ul className="mt-5 space-y-3">
              {s.bullets.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-border/60 bg-input/30 p-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[oklch(0.85_0.19_118_/_0.1)] text-[color:var(--gold)]">
                      <BIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.label}</p>
                      {b.sub && <p className="text-xs text-muted-foreground">{b.sub}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-7 flex items-center justify-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? "w-6 bg-[color:var(--gold)]" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={onPrev}
              disabled={step === 0}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5"
            >
              {isLast ? "Empezar" : "Siguiente"}
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassRatingDialog({
  classname,
  initial,
  onClose,
  onSave,
}: {
  classname: string;
  initial: Answer;
  onClose: () => void;
  onSave: (a: Answer) => void;
}) {
  const [a, setA] = useState<Answer>(initial);
  const [hoverRating, setHoverRating] = useState(0);

  const set = <K extends keyof Answer>(k: K, v: Answer[K]) =>
    setA((prev) => ({ ...prev, [k]: v }));

  const ratingLabels = ["", "Muy mal", "Mal", "Regular", "Bien", "Excelente"];
  const canSubmit =
    a.rating > 0 &&
    a.likeSubject.trim().length > 0 &&
    a.dislikeSubject.trim().length > 0 &&
    a.likeTeacher.trim().length > 0 &&
    a.dislikeTeacher.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:py-10">
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />
      <div className="luxe-card relative my-auto w-full max-w-xl rounded-2xl p-1.5 animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-[14px] bg-card/95 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--gold)]/90">Materia</p>
              <h3 className="mt-1.5 font-display text-3xl leading-tight">{classname}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-input/50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="hairline my-6 h-px w-full" />

          <RatingField
            rating={a.rating}
            hoverRating={hoverRating}
            ratingLabels={ratingLabels}
            onHover={setHoverRating}
            onChange={(r) => set("rating", r)}
          />

          <div className="mt-7 space-y-5">
            <RatingTextarea
              icon={ThumbsUp}
              tone="positive"
              label="Lo que te gusta de la materia"
              hint="Temas, actividades, dinámicas..."
              value={a.likeSubject}
              onChange={(v) => set("likeSubject", v)}
            />
            <RatingTextarea
              icon={ThumbsDown}
              tone="negative"
              label="Lo que no te gusta de la materia"
              hint="Cosas que sientes que sobran o faltan"
              value={a.dislikeSubject}
              onChange={(v) => set("dislikeSubject", v)}
            />
            <RatingTextarea
              icon={GraduationCap}
              tone="positive"
              label="Lo que te gusta del maestro"
              hint="Cómo enseña, cómo trata al grupo, etc."
              value={a.likeTeacher}
              onChange={(v) => set("likeTeacher", v)}
            />
            <RatingTextarea
              icon={AlertTriangle}
              tone="negative"
              label="Lo que no te gusta del maestro"
              hint="Recuerda: sin insultos. Habla de hechos."
              value={a.dislikeTeacher}
              onChange={(v) => set("dislikeTeacher", v)}
            />
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => canSubmit && onSave(a)}
              disabled={!canSubmit}
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold-foreground)] shadow-[0_10px_40px_-10px_oklch(0.85_0.19_118_/_0.6)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Guardar materia
              <Check className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingField({
  rating,
  hoverRating,
  ratingLabels,
  onHover,
  onChange,
}: {
  rating: number;
  hoverRating: number;
  ratingLabels: string[];
  onHover: (n: number) => void;
  onChange: (n: number) => void;
}) {
  const display = hoverRating || rating;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Calificación al maestro
        </span>
        <span className="text-xs text-muted-foreground/80">
          {display > 0 ? ratingLabels[display] : "Toca una estrella"}
        </span>
      </div>
      <div className="flex items-center gap-1.5" onMouseLeave={() => onHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= display;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} estrellas`}
              onMouseEnter={() => onHover(n)}
              onClick={() => onChange(n)}
              className="group p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 transition-all ${
                  active
                    ? "fill-[color:var(--gold)] text-[color:var(--gold)] drop-shadow-[0_0_8px_oklch(0.85_0.19_118_/_0.5)]"
                    : "text-muted-foreground/40"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RatingTextarea({
  icon: Icon,
  tone,
  label,
  hint,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "positive" | "negative";
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const max = 400;
  const toneClasses =
    tone === "positive"
      ? "border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-[oklch(0.85_0.19_115_/_0.06)] text-[color:var(--gold)]"
      : "border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[oklch(0.75_0.15_90_/_0.06)] text-[oklch(0.82_0.16_75)]";
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`grid h-7 w-7 place-items-center rounded-md border ${toneClasses}`}>
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/60">
          {value.length}/{max}
        </span>
      </div>
      <textarea
        rows={3}
        maxLength={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint}
        className="w-full resize-none rounded-lg border border-border bg-input/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-[color-mix(in_oklab,var(--gold)_60%,transparent)] focus:bg-input focus:shadow-[0_0_0_4px_oklch(0.85_0.19_118_/_0.1)]"
      />
    </div>
  );
}
