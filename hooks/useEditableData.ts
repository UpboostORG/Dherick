"use client";
import { useState, useEffect, useCallback, useMemo } from "react";

const PREFIX = "trip-edit-";

// Impressão digital dos dados que vêm do trip.ts. Se o trip.ts mudar, a cópia
// salva no localStorage é descartada — senão um snapshot antigo do navegador
// esconde a correção pra sempre (foi assim que o voo cancelado da Kuwait
// continuou aparecendo mesmo depois de trocado pelo EgyptAir).
function fingerprint(value: unknown): string {
  const json = JSON.stringify(value);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    hash = (hash << 5) - hash + json.charCodeAt(i);
    hash |= 0;
  }
  return `${json.length}:${hash}`;
}

type Stored<T> = { fp: string; data: T[] };

export function useEditableData<T>(section: string, defaults: T[]) {
  const [data, setData] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [edited, setEdited] = useState(false);

  const fp = useMemo(() => fingerprint(defaults), [defaults]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFIX + section);
      if (saved) {
        const parsed = JSON.parse(saved) as Stored<T> | T[];
        // Formato antigo (array puro, sem impressão digital) = anterior a esta
        // correção: não dá pra saber de que versão do trip.ts veio, descarta.
        if (!Array.isArray(parsed) && parsed?.fp === fp && Array.isArray(parsed.data) && parsed.data.length > 0) {
          setData(parsed.data);
          setEdited(true);
        } else {
          localStorage.removeItem(PREFIX + section);
        }
      }
    } catch {
      localStorage.removeItem(PREFIX + section);
    }
    setLoaded(true);
  }, [section, fp]);

  const write = useCallback((next: T[]) => {
    localStorage.setItem(PREFIX + section, JSON.stringify({ fp, data: next } satisfies Stored<T>));
    setEdited(true);
    window.dispatchEvent(new CustomEvent("trip-data-updated", { detail: section }));
  }, [section, fp]);

  const persist = useCallback((next: T[]) => {
    setData(next);
    write(next);
  }, [write]);

  const updateItem = useCallback((index: number, updates: Partial<T>) => {
    setData((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, ...updates } : item));
      write(next);
      return next;
    });
  }, [write]);

  const addItem = useCallback((item: T) => {
    persist([...data, item]);
  }, [data, persist]);

  const removeItem = useCallback((index: number) => {
    persist(data.filter((_, i) => i !== index));
  }, [data, persist]);

  const resetSection = useCallback(() => {
    localStorage.removeItem(PREFIX + section);
    setData(defaults);
    setEdited(false);
    window.dispatchEvent(new CustomEvent("trip-data-updated", { detail: section }));
  }, [section, defaults]);

  return { data, loaded, edited, updateItem, addItem, removeItem, resetSection };
}
