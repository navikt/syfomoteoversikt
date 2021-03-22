import { useSelector } from "react-redux";
import { getStatuser, ikkeAvbrutt, setMoteStatus } from "../utils/moterUtil";

export const useMoter = () => {
  const {
    hentingFeilet: hentMoterFeilet,
    henter: henterMoter,
    data: moter,
  } = useSelector((state) => state.moter);
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
