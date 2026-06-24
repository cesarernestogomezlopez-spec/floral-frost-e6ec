import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl px-8 sm:px-12 py-12 sm:py-16 flex flex-col items-center justify-center gap-6 text-center max-w-md w-full">
        <p className="font-mono text-[11px] tracking-[0.5em] uppercase text-foreground/50">
          Error
        </p>
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight leading-none">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Página no encontrada
        </h2>
        <p className="text-foreground/60 max-w-sm">
          La ruta que buscas no existe.
        </p>
        <Link
          to="/"
          className="btn-portal px-7 py-3 text-sm font-semibold tracking-[0.2em] uppercase"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
