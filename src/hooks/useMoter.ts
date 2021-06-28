import { ikkeAvbrutt } from "../utils/moterUtil";
import { useAppSelector } from "./hooks";
import { MoteDTO } from "../data/moter/moterTypes";

export const useMoter: () => {
  aktiveMoter: MoteDTO[];
  hentMoterFeilet: boolean;
  moter: MoteDTO[];
  henterMoter: boolean;
  harAktiveMoter: boolean;
} = () => {
  const {
    hentingFeilet: hentMoterFeilet,
    henter: henterMoter,
    data: moter,
  } = useAppSelector((state) => state.moter);
  const aktiveMoter = moter.filter(ikkeAvbrutt);

  return {
    henterMoter,
    aktiveMoter,
    harAktiveMoter: aktiveMoter.length > 0,
    moter,
    hentMoterFeilet,
  };
};
