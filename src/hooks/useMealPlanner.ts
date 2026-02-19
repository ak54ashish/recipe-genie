import { useState, useEffect, useCallback } from "react";
import type { Recipe } from "@/services/recipeService";

export interface MealPlan {
  [day: string]: Recipe[];
}

const STORAGE_KEY = "recipe-finder-meal-planner";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getInitialPlan(): MealPlan {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  const plan: MealPlan = {};
  DAYS.forEach((d) => (plan[d] = []));
  return plan;
}

export function useMealPlanner() {
  const [plan, setPlan] = useState<MealPlan>(getInitialPlan);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  const addMeal = useCallback((day: string, recipe: Recipe) => {
    setPlan((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), recipe],
    }));
  }, []);

  const removeMeal = useCallback((day: string, recipeUri: string) => {
    setPlan((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((r) => r.uri !== recipeUri),
    }));
  }, []);

  const clearAll = useCallback(() => {
    const empty: MealPlan = {};
    DAYS.forEach((d) => (empty[d] = []));
    setPlan(empty);
  }, []);

  return { plan, addMeal, removeMeal, clearAll, days: DAYS };
}
