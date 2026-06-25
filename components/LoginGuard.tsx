"use client";
import { useState, useEffect } from "react";

const VALID_USER = "dherickabreu";
const VALID_PASS = "Dk360@123";

export default function LoginGuard({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("__logged_in") === "true");
  }, []);

  if (loggedIn === null) return null;

  if (loggedIn) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user.trim() || !pass) { setError("Preencha todos os campos"); return; }
    if (user.trim() !== VALID_USER || pass !== VALID_PASS) { setError("Usuário ou senha incorretos"); return; }
    localStorage.setItem("__logged_in", "true");
    setLoggedIn(true);
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-bg-dark flex items-center justify-center font-sans">
      <div className="w-[90%] max-w-[400px] p-10 bg-[#2A2520] rounded-2xl border border-gold/15 shadow-2xl text-center">
        <svg className="w-16 h-16 mx-auto mb-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="22" fill="none" stroke="#E0A86B" strokeWidth="2.4" />
          <ellipse cx="50" cy="50" rx="9" ry="22" fill="none" stroke="#E0A86B" strokeWidth="2.4" />
          <line x1="28" y1="50" x2="72" y2="50" stroke="#E0A86B" strokeWidth="2.4" />
        </svg>
        <h1 className="text-gold text-[22px] font-semibold mb-2">Bem-vindo</h1>
        <p className="text-warm-400 text-sm mb-8">Acesso restrito</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-left">
            <label className="block text-warm-300 text-xs font-medium uppercase tracking-wider mb-1.5">Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e) => { setUser(e.target.value); setError(""); }}
              placeholder="seu usuário"
              autoComplete="username"
              className="w-full px-4 py-3.5 bg-bg-dark border border-gold/20 rounded-xl text-warm-100 text-[15px] outline-none focus:border-gold transition-colors placeholder:text-warm-500"
            />
          </div>
          <div className="text-left relative">
            <label className="block text-warm-300 text-xs font-medium uppercase tracking-wider mb-1.5">Senha</label>
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(""); }}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3.5 bg-bg-dark border border-gold/20 rounded-xl text-warm-100 text-[15px] outline-none focus:border-gold transition-colors placeholder:text-warm-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-9 text-warm-400 text-[13px] hover:text-warm-300"
            >
              {showPass ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button
            type="submit"
            className="mt-2 py-3.5 bg-gradient-to-br from-gold to-gold-dark rounded-xl text-bg-dark text-[15px] font-semibold hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Entrar
          </button>
          {error && <p className="text-red-400 text-[13px]">{error}</p>}
        </form>
      </div>
    </div>
  );
}
