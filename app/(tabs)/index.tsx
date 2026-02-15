// app/(tabs)/index.tsx
import { Redirect } from "expo-router";

export default function TabsIndex() {
  // Tela “fantasma”: mantém o padrão do template,
  // mas manda direto para a aba Faixas.
  return <Redirect href="/(tabs)/tracks" />;
}
