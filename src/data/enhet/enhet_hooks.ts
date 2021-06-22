import { useAppSelector } from "../../hooks/hooks";

export const useAktivEnhet = (): string => {
  const { aktivEnhet } = useAppSelector((state) => state.enhet);
  return aktivEnhet;
};
