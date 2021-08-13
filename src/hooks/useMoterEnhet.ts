import { ikkeAvbrutt } from "@/utils/moterUtil";
import { useAppSelector } from "./hooks";
import { MoteDTO } from "@/data/moter/moterTypes";

export const useMoterEnhet: () => {
  hentMoterFeilet: boolean;
  moter: MoteDTO[];
  aktiveMoter: MoteDTO[];
  harAktiveMoter: boolean;
  henterMoter: boolean;
  hentetMoterForEnhet: string;
} = () => {
  const {
    hentetEnhet,
    hentingFeilet: hentMoterFeilet,
    henter: henterMoter,
    data: moter,
  } = useAppSelector((state) => state.moterEnhet);
  const aktiveMoter = moter.filter(ikkeAvbrutt());

  return {
    hentetMoterForEnhet: hentetEnhet,
    moter,
    harAktiveMoter: aktiveMoter.length > 0,
    aktiveMoter,
    henterMoter,
    hentMoterFeilet,
  };
};
