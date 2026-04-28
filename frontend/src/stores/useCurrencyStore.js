import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_CURRENCY } from "../lib/currency";

export const useCurrencyStore = create(
	persist(
		(set) => ({
			currency: DEFAULT_CURRENCY,
			setCurrency: (currency) => set({ currency }),
		}),
		{
			name: "esta-currency",
			storage: createJSONStorage(() => localStorage),
		}
	)
);