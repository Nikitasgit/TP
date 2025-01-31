import { TCategory, TLanguage } from "@/types/filtersType";
import { create } from "zustand";

interface IFilters {
  language: TLanguage;
  category: TCategory;
  search: string;
  changeLanguage: (lg: TLanguage) => void;
  changeSearch: (newSearch: string) => void;
  changeCategory: (ct: TCategory) => void;
}

export const useFilters = create<IFilters>((set) => ({
  language: "fr-FR",
  category: "popular",
  search: "",
  changeLanguage: (lg) => set((state) => ({ ...state, language: lg })),
  changeCategory: (ct) => set((state) => ({ ...state, category: ct })),
  changeSearch: (newSearch) =>
    set((state) => ({ ...state, search: newSearch })),
}));
