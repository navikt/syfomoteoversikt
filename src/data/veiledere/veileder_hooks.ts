import { useAppSelector } from "@/hooks/hooks";

export const useAktivVeileder = (): string =>
  useAppSelector((state) => state.veiledere.aktivVeileder);
