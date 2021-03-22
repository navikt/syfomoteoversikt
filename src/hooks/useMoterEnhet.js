import { useSelector } from "react-redux";
import { getStatuser, ikkeAvbrutt, setMoteStatus } from "../utils/moterUtil";
import { finnVeilederNavn } from "../utils";

export const useMoterEnhet = () => {
  const {
    aktivEnhet,
    hentetEnhet,
    hentingFeilet: hentMoterFeilet,
    henter: henterMoter,
    data: moter,
  } = useSelector((state) => state.moterEnhet);
  const veiledere = useSelector((state) => state.veiledere.data);
  const aktiveMoterMedStatus = moter.map(setMoteStatus).filter(ikkeAvbrutt);
  const aktiveMoterMedStatusOgVeileder = aktiveMoterMedStatus.map((mote) => ({
    ...mote,
    veileder: veiledere.find((veileder) => mote.eier === veileder.ident),
  }));

  return {
    aktivEnhet,
    hentetEnhet,
    moter,
    harAktiveMoter: aktiveMoterMedStatus.length > 0,
    aktiveMoterMedStatusOgVeileder,
    getStatuser: () => getStatuser(aktiveMoterMedStatus),
    getVeiledere: () => [
      ...new Set(
        aktiveMoterMedStatusOgVeileder.map((mote) =>
          finnVeilederNavn(mote.veileder)
        )
      ),
    ],
    henterMoter,
    hentMoterFeilet,
  };
};
