import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-[11px] tracking-[0.5em] uppercase text-foreground/50">404</p>
      <h1 className="text-5xl font-black tracking-tight">
        <span className="gradient-text-green">Página no encontrada</span>
      </h1>
      <p className="text-foreground/60 max-w-sm">
        La ruta que buscas no existe.
      </p>
      <Link
        to="/"
        className="glass-btn text-sm font-semibold tracking-[0.2em] uppercase"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
