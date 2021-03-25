import { getStatuser, ikkeAvbrutt, setMoteStatus } from "../utils/moterUtil";
import { useAppSelector } from "./hooks";

export const useMoter = () => {
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
