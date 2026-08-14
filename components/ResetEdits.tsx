"use client";

export default function ResetEdits({ edited, onReset, label }: { edited: boolean; onReset: () => void; label: string }) {
  if (!edited) return null;
  return (
    <div className="flex items-center justify-between gap-3 bg-gold/10 border border-gold/30 rounded-lg px-4 py-2.5 mb-4">
      <p className="text-xs text-warm-400">
        ✏️ Você editou {label} neste aparelho — o que aparece aqui pode estar diferente do plano oficial.
      </p>
      <button
        onClick={onReset}
        className="text-xs font-medium text-gold hover:underline whitespace-nowrap shrink-0"
      >
        Restaurar original
      </button>
    </div>
  );
}
