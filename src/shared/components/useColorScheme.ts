// src/shared/hooks/useColorScheme.ts
import { useColorScheme as useRNColorScheme } from "react-native";

export type AppColorScheme = "light" | "dark";

/**
 * Hook simples (KISS) para obter o esquema de cores do sistema.
 * Retorna "dark" como fallback por padrão do app (você está usando tema escuro).
 */
export function useColorScheme(): AppColorScheme {
    const scheme = useRNColorScheme();
    return scheme === "light" ? "light" : "dark";
}
