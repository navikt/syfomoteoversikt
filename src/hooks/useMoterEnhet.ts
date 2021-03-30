import { getStatuser, ikkeAvbrutt, setMoteStatus } from "../utils/moterUtil";
import { finnVeilederNavn } from "../utils";
import { useAppSelector } from "./hooks";
import { MoteDTO } from "../data/moter/moterTypes";
import { VeilederDto } from "../data/veiledere/veilederTypes";

interface MoteMedVeileder extends MoteDTO {
  veileder?: VeilederDto;
}

export const useMoterEnhet: () => {
  hentetEnhet: string;
  getStatuser: () => string[];
  getVeiledere: () => string[];
  aktivEnhet: string;
  hentMoterFeilet: boolean;
  moter: MoteDTO[];
  aktiveMoterMedStatusOgVeileder: MoteMedVeileder[];
  harAktiveMoter: boolean;
  henterMoter: boolean;
} = () => {
  const {
    aktivEnhet,
    hentetEnhet,
    hentingFeilet: hentMoterFeilet,
    henter: henterMoter,
    data: moter,
  } = useAppSelector((state) => state.moterEnhet);
  const veiledere = useAppSelector((state) => state.veiledere.data);
  const aktiveMoterMedStatus = moter.map(setMoteStatus).filter(ikkeAvbrutt);
  const aktiveMoterMedStatusOgVeileder: MoteMedVeileder[] = aktiveMoterMedStatus.map(
    (mote) => ({
      ...mote,
      veileder: veiledere.find((veileder) => mote.eier === veileder.ident),
    })
  );

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
