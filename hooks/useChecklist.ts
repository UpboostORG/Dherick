"use client";

import { useState, useEffect, useCallback } from "react";
import { trip } from "@/data/trip";

const STORAGE_KEY = "checklist-state";

export type CheckItem = {
  text: string;
  done: boolean;
  priority: string;
  custom?: boolean;
};

function load(): CheckItem[] {
  if (typeof window === "undefined") return trip.checklist;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return trip.checklist;
    const parsed: CheckItem[] = JSON.parse(saved);
    const base = trip.checklist.map((item) => {
      const match = parsed.find((s) => s.text === item.text);
      return match ? { ...item, done: match.done } : item;
    });
    const custom = parsed.filter(
      (s) => s.custom && !trip.checklist.some((t) => t.text === s.text)
    );
    return [...base, ...custom];
  } catch {
    return trip.checklist;
  }
}

function persist(items: CheckItem[]) {
  const toSave = items.map((item) => ({
    text: item.text,
    done: item.done,
    priority: item.priority,
    custom: !trip.checklist.some((t) => t.text === item.text),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  window.dispatchEvent(new Event("checklist-updated"));
}

export function useChecklist() {
  const [items, setItems] = useState<CheckItem[]>(trip.checklist);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);

    const onUpdate = () => setItems(load());
    window.addEventListener("checklist-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("checklist-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const toggle = useCallback((idx: number) => {
    setItems((prev) => {
      const updated = prev.map((item, i) => i === idx ? { ...item, done: !item.done } : item);
      persist(updated);
      return updated;
    });
  }, []);

  const addItem = useCallback((text: string) => {
    if (!text.trim()) return;
    setItems((prev) => {
      const updated = [...prev, { text: text.trim(), done: false, priority: "MÉDIA" }];
      persist(updated);
      return updated;
    });
  }, []);

  return { items, loaded, toggle, addItem };
}

export function useChecklistStats() {
  const [stats, setStats] = useState({ done: 0, total: 0, pct: 0, pending: [] as CheckItem[] });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function calc() {
      const items = load();
      const done = items.filter((c) => c.done).length;
      const total = items.length;
      const pct = Math.round((done / total) * 100);
      const pending = items.filter((c) => !c.done && (c.priority === "ALTA" || c.priority === "CRÍTICA"));
      setStats({ done, total, pct, pending });
    }
    calc();
    setLoaded(true);
    window.addEventListener("checklist-updated", calc);
    window.addEventListener("storage", calc);
    return () => {
      window.removeEventListener("checklist-updated", calc);
      window.removeEventListener("storage", calc);
    };
  }, []);

  return { ...stats, loaded };
}
