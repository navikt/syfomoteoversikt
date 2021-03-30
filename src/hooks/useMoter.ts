import { getStatuser, ikkeAvbrutt, setMoteStatus } from "../utils/moterUtil";
import { useAppSelector } from "./hooks";
import { MoteDTO } from "../data/moter/moterTypes";

export const useMoter: () => {
  aktiveMoterMedStatus: MoteDTO[];
  getStatuser: () => string[];
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
  const aktiveMoterMedStatus = moter.map(setMoteStatus).filter(ikkeAvbrutt);

  return {
    henterMoter,
    aktiveMoterMedStatus,
    harAktiveMoter: aktiveMoterMedStatus.length > 0,
    getStatuser: () => getStatuser(aktiveMoterMedStatus),
    moter,
    hentMoterFeilet,
  };
};
