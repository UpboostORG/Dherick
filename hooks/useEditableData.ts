"use client";
import { useState, useEffect, useCallback } from "react";

const PREFIX = "trip-edit-";

export function useEditableData<T>(section: string, defaults: T[]) {
  const [data, setData] = useState<T[]>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PREFIX + section);
      if (saved) {
        const parsed = JSON.parse(saved) as T[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setData(parsed);
        }
      }
    } catch {}
    setLoaded(true);
  }, [section]);

  const persist = useCallback((next: T[]) => {
    setData(next);
    localStorage.setItem(PREFIX + section, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("trip-data-updated", { detail: section }));
  }, [section]);

  const updateItem = useCallback((index: number, updates: Partial<T>) => {
    setData((prev) => {
      const next = prev.map((item, i) => (i === index ? { ...item, ...updates } : item));
      localStorage.setItem(PREFIX + section, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("trip-data-updated", { detail: section }));
      return next;
    });
  }, [section]);

  const addItem = useCallback((item: T) => {
    persist([...data, item]);
  }, [data, persist]);

  const removeItem = useCallback((index: number) => {
    persist(data.filter((_, i) => i !== index));
  }, [data, persist]);

  const resetSection = useCallback(() => {
    localStorage.removeItem(PREFIX + section);
    setData(defaults);
  }, [section, defaults]);

  return { data, loaded, updateItem, addItem, removeItem, resetSection };
}
